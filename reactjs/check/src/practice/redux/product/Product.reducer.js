import { INCR, DECR } from "./Product.action";
let initialState = {
  name: "Samsung Galaxy",
  img: "https://rukminim2.flixcart.com/image/312/312/kn22m4w0/mobile/a/q/8/galaxy-f12-sm-f127gzgiins-samsung-original-imagftmjw3xqg4yk.jpeg?q=70",
  price: 11499,
  qty: 1,
};
let productReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCR:
      return { ...state, qty: state.qty + 1 };
    case DECR:
      return { ...state, qty: state.qty - 1 };
    default:
      return state;
  }
};
export { productReducer };
