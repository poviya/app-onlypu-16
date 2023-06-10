import { PaymentOrder, User } from "../interfaces";

export class Tools {
    static cropText(text: string, limit: number) {
        let res = text.slice(0, limit);
        return res;
    }

    static innerText(text: any)
    {
        const url = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const hashTags = /(^|\s)(#[a-z\d-]+)/ig;

        
        //text = text.replace(hashTags,"<a class='text-blue-400' href='$2' target='_blank'> $2 </a>");
        text = text.replace(url,"<a class='text-blue-400' href='$1' target='_blank'>$1</a>"); 
        text = text.replace(/(?:\r\n|\r|\n)/g,"<br>");
       
        return text;
    }

    static openPayment(res: PaymentOrder) {
        let url = '';
        if(document.domain === 'localhost')
        {
          url = 'http://localhost:4201/pay/on/' + res._id;
        } else if(document.domain === 'onlypu.com') {
          url = 'https://poviya.com/pay/on/' + res._id;
        }
        window.open(url, '_blank');
    }

    static production(user: User) {
        let production = false;
        const validExtensions = ['test@onlypu.com'];
    
        if (validExtensions.includes(user.email!))
        {
          production = false;
        } else {
          production = true;
        }
        return production;
    }
}
