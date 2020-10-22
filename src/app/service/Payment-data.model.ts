
export interface PaymentData {
    type: String;
    class: String;
    merchant: String;
    point: Number;
    curr: Number;
    date: Date;
    description: String;
    taxfree: Boolean;
    utu: Boolean;
    save_point: Number;
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
        date: new Date(obj.date),
        description: decode_utf8(obj.description),
        taxfree: obj.taxfree,
        utu: obj.utu,
        save_point: obj.save_point,
    };
    return item;
}