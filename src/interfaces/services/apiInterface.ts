import {AxiosResponse} from "axios";

export interface ApiInterface {
    invoke<T = any>(url: string): Promise<AxiosResponse<T>>;
}