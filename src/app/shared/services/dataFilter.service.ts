import { Injectable } from '@angular/core';
import { PropertyResolver } from '../utils/propertyResolver';

@Injectable()
export class DataFilterService extends PropertyResolver {
    
    constructor() {
        super();
    }
    
    filter(datasource: any[], filterProperties: string[], filterData: string) {
        if (datasource && filterProperties && filterData) {
            filterData = filterData.toUpperCase();
            const filtered = datasource.filter(item => {
                let match = false;
                for (const prop of filterProperties) {
                    let propVal: any = '';
                    
                    //Account for nested properties like 'state.name'
                    if (prop.indexOf('.') > -1) {
                        propVal = this.resolveProperty(prop, item);
                        if (propVal) {
                            propVal = propVal.toString().toUpperCase();
                        }
                    }
                    else {
                        if (item[prop]) {
                            propVal = item[prop].toString().toUpperCase();
                        }                        
                    }
                    
                    if (propVal.indexOf(filterData) > -1) {
                        match = true;
                        break;
                    }
                };
                return match;
            });
            return filtered;
        }
        else {
            return datasource;
        }
    }
    
}