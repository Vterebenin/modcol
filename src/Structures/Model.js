import get from 'lodash/get';
import uniqueId from 'lodash/uniqueId';
import {autobind} from '../utils.js';

export default class BaseModel {
    constructor(data = null) {
        autobind(this);
        this.errors = {};
        this.loading = false;
        this._uid = uniqueId();
        if (data) {
            this.set(data);
        }
    }

    defaultState() {
        return {};
    }

    clearState() {
        this.loading = false;
        this.errors = {};
        this.set(this.defaultState());
    }

    get(prop, defaultValue) {
        return get(this, prop, defaultValue);
    }

    set(data) {
        Object.entries(data).forEach(([key, value]) => {
            this[key] = value;
        });
        return this;
    }

    async doWithLoading(func, ...args) {
        this.loading = true;
        const response = await func(args);
        this.loading = false;
        return response;
    }

    // mapper of validation functions and messages
    apiFunctions() {
        return {
            fetch: () => null,
            create: () => null,
            read: () => null,
            update: () => null,
            delete: () => null,
        };
    }

    async validateAndMakeRequest(payload, context = null, requestFunc) {
        let response;
        const valid = this.validate(context);
        if (!valid) {
            return;
        }

        this.loading = true;
        try {
            response = await requestFunc(payload);
        } catch (e) {
            console.error(e);
            response = e;
            return false;
        } finally {
            this.loading = false;
        }
        return response;
    }

    validateAndFetch(payload, context = null) {
        return this.validateAndMakeRequest(payload, context, this.fetch);
    }

    validateAndCreate(payload, context = null) {
        return this.validateAndMakeRequest(payload, context, this.create);
    }

    validateAndRead(payload, context = null) {
        return this.validateAndMakeRequest(payload, context, this.read);
    }

    validateAndUpdate(payload, context = null) {
        return this.validateAndMakeRequest(payload, context, this.update);
    }

    validateAndDelete(payload, context = null) {
        return this.validateAndMakeRequest(payload, context, this.delete);
    }

    // TODO: change to events
    afterFetch() {
    }

    async makeRequest(payload, reqFunc) {
        if (reqFunc) {
            return await this.doWithLoading(() => reqFunc(payload));
        }
        return null;
    }

    async fetch(payload) {
        const response = await this.makeRequest(
            payload,
            this.apiFunctions()?.fetch,
        );
        this.set(response.data);
        this.afterFetch(response);
        return response;
    }

    create(payload) {
        return this.makeRequest(payload, this.apiFunctions()?.create);
    }

    read(payload) {
        return this.makeRequest(payload, this.apiFunctions()?.read);
    }

    update(payload) {
        return this.makeRequest(payload, this.apiFunctions()?.update);
    }

    delete(payload) {
        return this.makeRequest(payload, this.apiFunctions()?.delete);
    }

    // mapper of validation functions and messages
    validation() {
        return {};
    }

    validate(context = null) {
        this.errors = {};
        const validation = this.validation(context);

        let result = true;

        for (const [errorKey, condition] of Object.entries(validation)) {
            const value = condition();
            if (value) {
                this.errors[errorKey] = value;
                result = false;
            }
        }

        return result;
    }
}
