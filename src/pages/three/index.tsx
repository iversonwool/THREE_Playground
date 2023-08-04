import React, { ReactNode } from 'react';
import { Card, Row, Col, Modal } from 'antd';
import styles from './index.less';
import Responsive from './example/responsive';
import Scenegraph from './example/scenegraph';

type Item = {
  title: string;
  cmpt: () => ReactNode;
};

function ThreePlayground() {
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState<Item>({ title: '', cmpt: () => null });

  function showDemo(i: Item) {
    setItem(i);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  const demoList = [
    {
      name: 'Responsive',
      title: '响应式设计',
      cmpt: Responsive,
    },
    {
      name: 'Scenegraph',
      title: '场景图',
      cmpt: Scenegraph,
    },
    // {
    //   name: 'basic1',
    //   title: 'Basic1',
    // },
    // {
    //   name: 'advanced2',
    //   title: 'Advanced2',
    // },
  ];
  const Cmpt = item.cmpt;

  return (
    <Row gutter={[16, 16]} className={styles.threeHomepage}>
      {demoList.map((item) => {
        const { name, title } = item;
        return (
          <Col
            key={name}
            xs={12}
            sm={8}
            md={6}
            lg={6}
            xl={6}
            xxl={4}
            onClick={() => {
              showDemo(item);
            }}
          >
            <Card title={title} hoverable>
              {name}
            </Card>
          </Col>
        );
      })}

      <Modal
        width={'100%'}
        title={item.title}
        open={open}
        onCancel={closeModal}
        footer={null}
        className={styles.modalStyle}
        bodyStyle={{ flex: 1, overflow: 'hidden' }}
      >
        <Cmpt />
      </Modal>
    </Row>
  );
}

export default ThreePlayground;
