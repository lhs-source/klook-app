
export interface PaymentData {
    type: string;
    class: string;
    merchant: string;
    point: number;
    curr: number;
    country: string;
    date: Date;
    description: string;
    taxfree: boolean;
    utu: boolean;
    save_point: number;
}

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

export function encode_paymentData(obj : PaymentData) {

    let item = {
        type: obj.type,
        class: encode_utf8(obj.class),
        merchant: encode_utf8(obj.merchant),
        point: obj.point,
        curr: obj.curr,
        country:obj.country,
        date: obj.date,
        description: encode_utf8(obj.description),
        taxfree: obj.taxfree,
        utu: obj.utu,
        save_point: obj.save_point,
    };
    return item;
}
export function decode_paymentData(obj : PaymentData) {
    let item = {
        type: obj.type,
        class: decode_utf8(obj.class),
        merchant: decode_utf8(obj.merchant),
        point: obj.point,
        curr: obj.curr,
        country:obj.country,
        date: new Date(obj.date),
        description: decode_utf8(obj.description),
        taxfree: obj.taxfree,
        utu: obj.utu,
        save_point: obj.save_point,
    };
    return item;
}