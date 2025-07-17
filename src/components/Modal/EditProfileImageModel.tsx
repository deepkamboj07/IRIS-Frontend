import { useState } from 'react';
import { Modal, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Label } from '../UI/Label';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; username: string; profileUrl?: string }) => void;
  initialValues: { name: string; username: string; profileUrl?: string };
  onImageUpload: (file: File) => Promise<string>;
};

export const EditProfileModal = ({
  open,
  onClose,
  onSave,
  initialValues,
  onImageUpload,
}: Props) => {
  const [name, setName] = useState(initialValues.name);
  const [username, setUsername] = useState(initialValues.username);
  const [uploading, setUploading] = useState(false);
  const [profileUrl, setProfileUrl] = useState(initialValues.profileUrl || '');

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const url = await onImageUpload(file);
      setProfileUrl(url);
      onClose();
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    onSave({ name, username, profileUrl });
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Edit Profile"
      onCancel={onClose}
      onOk={handleSave}
      okText="Save"
    >
      <div className="flex flex-col gap-4">

        <div className="flex flex-col gap-2">
            <Label>Full Name</Label>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
            <Label>Username</Label>
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <Upload
          accept="image/*"
          showUploadList={false}
          customRequest={({ file, onSuccess }) => {
            if (file instanceof File) {
              handleUpload(file).then(() => {
                if (onSuccess) onSuccess("ok");
              });
            }
          }}
        >
          <Button icon={<UploadOutlined />} loading={uploading}>
            {profileUrl ? 'Change Profile Picture' : 'Upload Profile Picture'}
          </Button>
        </Upload>
        {profileUrl && (
          <img src={profileUrl} alt="Preview" className="rounded-full w-16 h-16 mt-2 object-cover" />
        )}
      </div>
    </Modal>
  );
};
