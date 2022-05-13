export class Item {
    item_code: string;
    description: string;
    price: number;
    quantity: number;
    folder_path: string;
    base_path: string;
    physical_file_name: string;
    supplier: string;
    orderQuantity: number = 1
}