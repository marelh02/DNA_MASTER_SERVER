function findPattern(dna, seq){
    let results=[]
    let start=null
    let step=0
    if (seq.length>dna.length) {
      throw new Error(`The pattern is bigger than the actual sequence`);
    }
  
    for (let i = 0; i < dna.length; i++) {
      let nucleotide=dna.charAt(i)      
      if ("ATCG".indexOf(nucleotide) === -1) {
        throw new Error(`${nucleotide} is not a valid nucleotide.`);
      }
      if(seq.charAt(step)==nucleotide){        
        if(start==null) start=i
        step=step+1        
      }else{
        start=null
        step=0
      }
      if(seq.length==step){
        results.push(
          {
            status:"found",
            start:start,
            end:start+step-1
          }
        )
      }
    }
    if(start!=null){
      results.push(
        {
          status:"possible",
          start:start,
          end:start+step-1
        }
      )
    }
  
    return results
  }

console.log(findPattern("TTTGGGCGGCTCGGGGTC","TCG"));