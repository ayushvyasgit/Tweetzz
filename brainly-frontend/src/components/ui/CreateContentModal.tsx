import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";

enum ContentType {
  Youtube = "Youtube",
  Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      link,
      title,
      type
    }, {
      headers: {
        "Authorization": localStorage.getItem("token") || ""
      }
    });

    console.log("Add Content:", { title, link, type });
    onClose();
  }

  if (!open) return null;

  return (
    <>
      {/* Modal background */}
      <div className="fixed inset-0 bg-black opacity-50 z-10" />

      {/* Modal dialog */}
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-end">
            <button onClick={onClose}>
              <CrossIcon />
            </button>
          </div>

          <div className="space-y-4">
            <Input ref={titleRef} placeholder="Title" />
            <Input ref={linkRef} placeholder="Link" />

            <div>
              <h1 className="font-semibold">Type</h1>
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={() => setType(ContentType.Youtube)}
                  variant={type === ContentType.Youtube ? "primary" : "secondary"}
                  size="sm"
                  text="YouTube"
                />
                <Button
                  onClick={() => setType(ContentType.Twitter)}
                  variant={type === ContentType.Twitter ? "primary" : "secondary"}
                  size="sm"
                  text="Twitter"
                />
              </div>
            </div>

            <div>
              <Button
                onClick={addContent}
                variant="primary"
                size="sm"
                text="Submit"
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
