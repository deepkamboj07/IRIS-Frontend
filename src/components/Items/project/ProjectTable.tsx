import React, { useEffect } from 'react';
import { Table, Typography, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useProjectStore } from '../../../store/useProjectStore';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface ProjectRowType {
  key: string;
  name: string;
  description: string;
}

const ProjectTable: React.FC = () => {
  const { projects, fetchProjects, loading } = useProjectStore();

  const navigate = useNavigate();
  // Initial fetch on mount
  useEffect(() => {
    fetchProjects({ page: 1, limit: 8 });
  }, []);

  // Handle pagination change
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 8 } = pagination;
    fetchProjects({ page: current, limit: pageSize });
  };

  const columns: ColumnsType<ProjectRowType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Tag color="blue">{record.name.charAt(0)}</Tag>
          <Text strong>{record.name}</Text>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (desc) => <Text type="secondary">{desc || '-'}</Text>,
    },
  ];

  const data: ProjectRowType[] = projects.docs.map((project) => ({
    key: project.id,
    name: project.name,
    description: project.description || '',
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: projects.page,
          pageSize: projects.limit,
          total: projects.total,
          showSizeChanger: false,
           position: ['bottomCenter'], 
        }}
        onRow={(record) => ({
          onClick: () => navigate(`/projectTasks?id=${record.key}`),
          style: { cursor: 'pointer' },
        })}
        rowKey="key"
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ProjectTable;
