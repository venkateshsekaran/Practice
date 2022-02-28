let size = [38,38,40,42,44,42]
let new_size =[]
for ( let i=0; i<=size.length-1; i++)
{
    if (new_size.indexOf (size[i])==-1 ) 
    {
            new_size.push(size[i]);
    }
}
console.log(new_size);
