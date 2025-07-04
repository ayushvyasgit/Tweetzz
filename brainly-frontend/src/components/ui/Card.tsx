import { PlusIcon } from "../../icons/PlusIcon";

interface CardProps{
  title :string;
  link  :string;
  type  :"twitter"|"youtube";
}

export function Card({title,link,type}:CardProps){
  return (
    <div className="p-4 bg-white rounded-md border-gray-200 min-h-40 min-w-72 max-w-72 border shadow-md">
      
      <div className="flex items-center">
        <div className="text-gray-500 pr-2" >
          <PlusIcon/>
        </div>
        <div className="flex">
            <div className="pr-2 text-gray-500 bold">
              <h3>{title}</h3>
            </div>
            
            <div className="text-gray-500">
              <a href={link} target="_blank">
                
              </a>
            </div>

          </div>
        </div>
      
      <div className="pt-4">
        {type === "youtube" && <iframe
                                className="w-full"
                                width="560"
                                height="315"
                                src={link.replace("watch?v=", "embed/").replace("&t=", "?start=")}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              ></iframe>
                              }
      </div>


      <div>
        {type === "twitter" && 
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com","twitter.com")}> </a>
          </blockquote>
        }
      </div>

    </div>
  );
}
