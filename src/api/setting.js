import blogWeb from "./request";

export default async function(){
  const res = await blogWeb({
      url:"/api/setting"
  })
  // console.log(res.data);
  return res.data;
}
