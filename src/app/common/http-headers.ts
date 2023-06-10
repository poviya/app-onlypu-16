import { HttpHeaders } from "@angular/common/http";

export class Headers {
    static HttpOptions() {
        const response = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        }
        return response;
    }
}