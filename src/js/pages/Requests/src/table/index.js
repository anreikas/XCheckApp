/* eslint-disable camelcase */
import React from 'react';
import { Tag } from 'antd';
import Table from '../../../../components/Table';
import { UrlPath } from '../../../../utils';
import { SERVER_URL } from '../../../../constants';

const MAX_ROWS = 30;
const columns = [
  {
    title: 'task',
    dataIndex: 'id',
    searched: true,
    sorter: true,
  },
  {
    title: 'author',
    dataIndex: 'author',
    searched: true,
    sorter: true,
  },
  {
    title: 'state',
    dataIndex: 'state',
    render: (tag) => (
      <Tag color={'geekblue'} key={tag}>
        {tag}
      </Tag>
    ),
    sorter: true,
  },
  {
    title: 'score',
    dataIndex: 'score',
    sorter: true,
    map: ((record) => {
      const { selfGrade = {} } = record;
      const { items } = selfGrade;

      if (items) {
        return Object.entries(items).reduce((acc, [, value]) => {
          const { score } = value;

          return acc + score;
        }, 0);
      }

      return '--';
    }),
  },
];

export default ({ onClick, filter, title }) => (
  <Table
    title={title}
    onClick={onClick}
    columns={columns}
    url={UrlPath(SERVER_URL, 'reviewRequests')}
    maxRows={MAX_ROWS}
    filter={filter}
  />
);
