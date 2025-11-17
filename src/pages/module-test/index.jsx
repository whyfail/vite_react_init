import { Button, Space, Table, Tag } from 'antd';
import { produce } from 'immer';
import { useState } from 'react';

function TestIndex() {
  const [originData, setOriginData] = useState(Array.from({ length: 100 }).map((item, index) => ({
    key: index.toString(),
    name: `John Brown${index}`,
    age: 32 + index,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  })));

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>{text}</span>,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';

            if (tag === 'loser') {
              color = 'volcano';
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => setOriginData(produce((draft) => {
              draft.find(item => item.key === record.key).age += 1;
            }))}
          >
            年龄+1
          </Button>
          <Button type="link" onClick={() => setOriginData(originData.filter(item => item.key !== record.key))}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-#fff p-25px">
      <Table columns={columns} dataSource={originData} />
    </div>
  );
}

export default TestIndex;
