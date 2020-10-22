
export interface PaymentData {
    type : String;
    class : String;
    merchant: String;
    point : Number;
    curr : Number;
    date : Date;
    description : String;
    taxfree : Boolean;
    utu : Boolean;
    save_point: Number;
}