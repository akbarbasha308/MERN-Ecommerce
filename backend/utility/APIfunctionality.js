class apifunctionality 
{
    constructor(query,querystr)
    {
        this.query=query,
        this.querystr=querystr
    }
    search()
    {
const keyword=this.querystr.keyword?{name:{$regex:this.querystr.keyword,
                                            $options:"i"}}:{}
       this.query=this.query.find({...keyword})  
       return this                                   
    }
    filter()
    {
        const querycopy={...this.querystr}
       const removefields=["keyword","page","limit"];
        removefields.forEach((key)=>delete querycopy[key])
         this.query=this.query.find(querycopy)
           return this   
    }
    pagination(resultPerPage)
  {
    const currentPage=Number(this.querystr.page)||1
    const skip=resultPerPage*(currentPage-1)
    this.query=this.query.limit(resultPerPage).skip(skip)
return this
    }
}
export default apifunctionality