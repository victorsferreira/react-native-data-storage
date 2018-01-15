import { AsyncStorage } from 'react-native';

class _DataStorage{
    constructor(){
        this.secret = 'react-native-data-storage';
        this.init();
    }

    init(){
        try {
            AsyncStorage.getItem(this.secret)
            .then((data)=>{
                if (data === null) this.setAll({});
            });
        } catch (err) {
            Promise.reject(err);
        }
    }

    getAll(){
        try {
            return AsyncStorage.getItem(this.secret)
            .then((data)=>{
                console.log('getAll', data)
                if (data !== null){
                    return JSON.parse(data);
                }else return {};
            });
        } catch (err) {
            console.log('getAll err')
            Promise.reject(err);
        }
    }

    setAll(data){
        try {
            if(typeof data !== 'string') data = JSON.stringify(data);
            console.log('storage set data', data)
            return AsyncStorage.setItem(this.secret, data);
        } catch (err) {
            console.log('err setAll', err.message)
            return Promise.reject(err);
        }
    }

    set(key, value){
        return this.getAll()
        .then((data)=>{
            if(typeof key === 'object' && !value) data = Object.assign({},data,key);
            else data[key] = value;
            return this.setAll(data);
        });
    }

    get(key){
        return this.getAll()
        .then((data)=>{
            if(Array.isArray(key)){
                var output = {};
                for(var k of key){
                    if(k in data) output[k] = data[k]; //  else simply don't add the key
                }

                return output;
            }else{
                if(key in data) return data[key];
                else throw new Error(`Key '${key}' not found`);
            }
        });
    }

    has(key){
        return this.getAll()
        .then((data)=>{
            if(Array.isArray(key)){
                var output = {};
                for(var k of key) output[k] = k in data;
                return output;
            }else return key in data;
        });
    }

    remove(key){
        return this.getAll()
        .then((data)=>{
            if(Array.isArray(key)){
                var output = {};
                for(var k of key){
                    if(k in data) delete data[k];
                }
            }else{
                 if(key in data) delete data[key];
                 else throw new Error(`Key '${key}' not found`);
            }

            return this.setAll(data);
        });
    }
}

export default DataStorage = new _DataStorage();
