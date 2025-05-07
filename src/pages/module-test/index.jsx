import { Button, Space, Table, Tag } from 'antd';

const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `John Brown${i}`,
    age: 32 + i,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  });
}

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
        <Button type="link">
          Invite
          {record.name}
        </Button>
        <Button type="link">Delete</Button>
      </Space>
    ),
  },
];

function TestIndex() {
  return (
    <div className="bg-#fff p-25px">
      <Table columns={columns} dataSource={originData} />
    </div>
  );
}

export default TestIndex;
