import Utils from "./Utils";

export default class Api {

    static build_query(params, url) {
        let newURL = new URL(url);
        for (let item in params) {
            if (params.hasOwnProperty(item)) {
                newURL.searchParams.set(item, params[item]);
            }
        }
        return newURL.href;
    }

    static fetch(route, data = {}, method = "GET", postJSON = false) {
        let config;

        if (method.toLowerCase() === "post" && postJSON) {
            config = {
                method: method,
                cache: "no-store",
                body: !Utils.isString(data) ? JSON.stringify(data) : data,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            };
        } else {
            if (data && Utils.isObject(data) && !Utils.isEmpty(data)) {
                route = Api.build_query(data, route);
            }
            config = {
                method: method,
                cache: "no-store",
            };
        }

        return fetch(route, config)
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                return false;
            });
    }

}
