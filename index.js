// Catalog
// SKU	Name	Price
// ipd	Super iPad	$549.99
// mbp	MacBook Pro	$1399.99
// atv	Apple TV	$109.50
// vga	VGA adapter	$30.00

// Specials 
// we're going to have a 3-for-2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
// the brand new Super iPad will have a bulk discount applied, where the price will drop to $499.99 each if someone buys more than 4
// we will bundle in a free VGA adapter free of charge with every MacBook Pro sold

// Classes / Functions: checkout, scan, total

class checkOut{ // Declaration of checkout class
    constructor(productsArray) {
        this.productsArray = [ // Catalog of the products, Name is included for future reference 
        {SKU: 'ipd', Name: 'Super iPad', Price: 549.99},
        {SKU: 'mbp', Name: 'MacBook Pro', Price: 1399.99},
        {SKU: 'atv', Name: 'Apple TV', Price: 109.50},
        {SKU: 'vga', Name: 'VGA Adapter', Price: 30.00}
        ];
        this.SKU = productsArray.SKU;
        this.Name = productsArray.Name;
        this.Price = productsArray.Price;
        this.scanArray = [];
    }

    scan(item){ // Scan method 
        this.scanArray.push(item); // Putting Scanned Items into an Array
    }

    total(){ // Total method
        this.ipdCounter = this.scanArray.filter(x => x == 'ipd').length; // Counting all 'ipd' elements in the scanned array
        this.mbpCounter = this.scanArray.filter(x => x == 'mbp').length; // Counting all 'mbp' elements in the scanned array
        this.atvCounter = this.scanArray.filter(x => x == 'atv').length; // Counting all 'atv' elements in the scanned array
        this.vgaCounter = this.scanArray.filter(x => x == 'vga').length; // Counting all 'vga' elements in the scanned array
        
        // Specials
        if (this.atvCounter%3 == 0) { // we're going to have a 3-for-2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
            this.productsArray[2].Price = 73;
        }
        if (this.ipdCounter > 4) { // the brand new Super iPad will have a bulk discount applied, where the price will drop to $499.99 each if someone buys more than 4
            this.productsArray[0].Price = 499.99;
        }
        if (this.mbpCounter >= 1 && this.mbpCounter == this.vgaCounter ) { // we will bundle in a free VGA adapter free of charge with every MacBook Pro sold
            this.productsArray[3].Price = 0;
        }
        else if (this.mbpCounter < this.vgaCounter && this.mbpCounter != 0) { // conditional if there are more vgas than mbps (for the free vga WITH EVERY macbook pro)
            this.vgaCounter = this.vgaCounter - this.mbpCounter;
        }
        this.ipdSum = this.ipdCounter * this.productsArray[0].Price; // total price for ipd
        this.mbpSum = this.mbpCounter * this.productsArray[1].Price; // total price for mbp
        this.atvSum = this.atvCounter * this.productsArray[2].Price; // total price for atv
        this.vgaSum = this.vgaCounter * this.productsArray[3].Price; // total price for vga
        this.totalSum = this.ipdSum + this.mbpSum + this.atvSum + this.vgaSum; // total price for all products
        return console.log("\nSKUs Scanned: "+this.scanArray+" Total expected: $"+this.totalSum+ "\n"); 
    }
    
};

let productsArray = [];

// test case 1
// expected: SKUs Scanned: atv, atv, atv, vga Total expected: $249.00
const co1 = new checkOut(productsArray);
co1.scan('atv');
co1.scan('atv');
co1.scan('atv');
co1.scan('vga');
co1.total();

// test case 2
// expected: SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95
const co2 = new checkOut(productsArray);
co2.scan('atv');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('atv');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('ipd');
co2.total();

// test case 3
// expected: SKUs Scanned: mbp, vga, ipd Total expected: $1949.98
const co3 = new checkOut(productsArray);
co3.scan('mbp');
co3.scan('vga');
co3.scan('ipd');
co3.total();



