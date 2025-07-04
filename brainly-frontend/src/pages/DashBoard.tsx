import '../App.css'
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CreateContentModal } from '../components/ui/CreateContentModal';
import { Sidebar } from '../components/ui/Sidebar';
import { PlusIcon } from '../icons/PlusIcon';
import { useEffect, useState } from 'react';
import { useContent } from '../hooks/useContent';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { PlusIcon2 } from '../icons/PlusIcon2';

export default function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    if (!modalOpen) refresh();
  }, [modalOpen]);


  return (
    <div>
      <Sidebar />
      <div className='p-4 ml-72'>
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className='flex justify-end gap-8'>
          <Button
            onClick={async () => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
              }, {
                headers: {
                  "Authorization": localStorage.getItem("token")
                }
              });
              const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
              alert(shareUrl);
            }}
            startIcon={<PlusIcon />}
            size="sm"
            variant="primary"
            text="Share"
          />

          <Button
            onClick={() => setModalOpen(true)}
            startIcon={<PlusIcon2 />}
            size="lg"
            variant="secondary"
            text="Add content"
          />
        </div>

        <div className="flex flex-wrap">
          {contents.map(({ type, link, title }) => (
            <Card key={link} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}
