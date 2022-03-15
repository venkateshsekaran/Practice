let goToMovie = (success,failure) => {
    let amount =1000;
    amount > 1200 ? success("Enjoy") : failure("Better Luck Next Time")
}
goToMovie((go) =>{console.log(go);},(err) =>{console.log(err)});




