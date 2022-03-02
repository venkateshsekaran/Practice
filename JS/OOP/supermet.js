class parent
{get_Total_Assets()
    {
        console.log("hi 10cr");
    }
}
class child extends parent 
{
    get_details()
    {
        super.get_Total_Assets()
    }
    get_Total_Assets()
    {
        console.log("hi 15cr");
    }
}
let c1= new child();
c1.get_details()
c1.get_Total_Assets()
