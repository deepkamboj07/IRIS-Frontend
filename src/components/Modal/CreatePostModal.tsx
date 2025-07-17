import { Form, Input, Upload, Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { RcFile, UploadFile } from 'antd/es/upload';
import { usePostStore } from '../../store/usePostStore';

interface CreatePostFormProps {
  onClose: () => void;
  onSubmit?: (data: { title: string; content: string; images: string[] }) => void;
  open: boolean;
  setOpen: (open: boolean) => void;

}

const CreatePostModal: React.FC<CreatePostFormProps> = ({ onClose, onSubmit, open, }) => {
  const [form] = Form.useForm();
  const {uploadImage} = usePostStore();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    setUploading(true);
    try {
      const uploadedUrls = await Promise.all(
        fileList.map(async (file) => {
          if (file.originFileObj) {
            const url = await uploadImage(file.originFileObj as File);
            return url;
          }
          return '';
        })
      );
      const values = await form.validateFields();
      onSubmit?.({ ...values, images: uploadedUrls });
      message.success('Post created successfully');
      form.resetFields();
      setFileList([]);
      onClose();
    } catch (err) {
      console.error(err);
      message.error('Failed to create post');
    } finally {
      setUploading(false);
    }
  };

  const beforeUpload = (file: RcFile) => {
    if (fileList.length >= 5) {
      message.error('You can only upload up to 5 images');
      return Upload.LIST_IGNORE;
    }
    console.log('File before upload:', file);
    return true;
  };

  return (
    <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        title="Create New Post"
      >
    <Form layout="vertical" form={form}>
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Title is required' }]}>
        <Input placeholder="Enter post title" />
      </Form.Item>

      <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Content is required' }]}>
        <Input.TextArea rows={4} placeholder="Write your post content..." />
      </Form.Item>

      <Form.Item label="Images (Max 5)">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          beforeUpload={beforeUpload}
          onRemove={(file) => {
            setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
            return true;
          }}
        >
          {fileList.length >= 5 ? null : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <div className="flex justify-end gap-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" loading={uploading} onClick={handleUpload}>
          Submit
        </Button>
      </div>
    </Form>
    </Modal>
  );
};

export default CreatePostModal;
