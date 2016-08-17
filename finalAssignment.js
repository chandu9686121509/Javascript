var fs=require('fs');
const readline=require('readline');

var out3=fs.createWriteStream('res.json');
out3.readable=true;
out3.writable=true;

var out1=fs.createWriteStream('res1.json');
out1.readable=true;
out1.writable=true;
var IndicatorNameIndex;
var ob={};
const rl=readline.createInterface({
  input:fs.createReadStream('Indicators.csv')
});

var colname=[];
var line=[];
var out=[];
var bar=[];
var bar1=[];
var x=0;

var asiacount=["Afghanistan","Bahrain","Bangladesh","Bhutan","Myanamar","Cambodia","China","India","Indonesia","Iraq","Israel","Japan","Jordan","Kazakhstan","Lebanon","Malaysia",
         "Maldives","Mauritania","Mexico","Mongolia","Nepal","Oman","Pakistan","Romania","Syrian Arab Republic","Singapore","Tajikistan","Thailand","Timor-Leste","Turkey","United Arab Emirates","Uzbekistan","Vietnam","Yemen"];

         rl.on('line', function(line){
           if(x==0)
           {
             colname=line.split(',');
             x++;
           }
           else{


              var lineInfo=line.split(",");
              if(lineInfo[0]=="India")
              {
                if(lineInfo[2]=="Urban population (% of total)" || lineInfo[2]=="Rural population (% of total population)")
                {
                  if(lineInfo[4]>=1960&&lineInfo[4]<=2015)
                  {
                    bar.push({"IndicatorName":lineInfo[2], "year":lineInfo[4], "value":parseFloat(lineInfo[5])});
                  //  console.log(bar);
                  }
                }
              }
              var temp=[];
              for(x=0;x<asiacount.length;x++)
              {
                if(lineInfo[0]==asiacount[x])
                {
                  if(lineInfo[2]=="Urban population" || lineInfo[2]=="Rural population")
                  {
                    if(lineInfo[4]>=1960&&lineInfo[4]<=2015)
                    {
                      bar1.push({"CountryName":lineInfo[0], "IndicatorName":lineInfo[2], "year":lineInfo[4], "value":lineInfo[5]});

                    }
                  }
                }
              }
            }

      });


        var ar3=[];
        var add1=0;
        var addm=0;
        var addn=0;

          var urbanAndRural=[];
        // var ob={};
         var sum=0;
         var ob1={};
         rl.on('close',() =>{
           for(y=1960;y<=2015;y++)
           {
           for(x=0;x<asiacount.length;x++)
           {
             for(i=0;i<bar1.length-1;i+=2)
             {
               if(bar1[i].CountryName==asiacount[x])
               {

                   if(bar1[i].year==y)
                   {
                    addm=addm+parseFloat(bar1[i].value);
                    addn=addn+parseFloat(bar1[i+1].value);
                    sum=sum+(parseFloat(bar1[i].value))+(parseFloat(bar1[i+1].value));
                     urbanAndRural.push({CountryName:bar1[i].CountryName,value:sum});

                     urbanAndRural.sort(function(a,b){
                       return b.value-a.value;
                     });

                     ob1[bar1[i].year]=urbanAndRural;
                     add1=add1+sum;
                     sum=0;

                   }
                 }
               }
             }
             urbanAndRural=[];

             ar3.push({"year":y,"urban":addm,"rural":addn});
                         addm=0;
                         addn=0;
           }
           console.log(bar);
          //  console.log(ob);
           //console.log(ob1);

           ob1={};

           ob1.India=bar;

          out1.write(JSON.stringify(bar));
          out3.write(JSON.stringify(ar3));
         });
