import { getBalance } from "./getUserBalance.js"
export const checkUser = async (user) =>{
  const res = await getBalance(user);
  if (res.data.length <= 0){
    return false;
  } else{
    return true;
  }
}