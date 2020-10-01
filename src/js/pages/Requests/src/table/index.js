/* eslint-disable camelcase */
import React from 'react';
import { Tag } from 'antd';
import Table from '../../../../components/Table';
import { UrlPath } from '../../../../utils';
import { SERVER_URL, STATES } from '../../../../constants';

const MAX_ROWS = 10;
const columns = [
  {
    title: 'task',
    dataIndex: 'task',
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
    filters: [
      {
        text: STATES.PUBLISHED,
        value: STATES.PUBLISHED,
      },
      {
        text: STATES.DRAFT,
        value: STATES.DRAFT,
      },
    ],
    onFilter: (value, record) => record.state.indexOf(value) === 0,
    render: (tag) => (
      <Tag color={'geekblue'} key={tag}>
        {tag}
      </Tag>
    ),
  },
  {
    title: 'score',
    dataIndex: 'score',
    sorter: (a, b) => a.score - b.score,
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

export default ({
  onClick,
  filter,
  title,
  update,
  onUpdate,
}) => (
  <Table
    title={title}
    onClick={onClick}
    columns={columns}
    url={UrlPath(SERVER_URL, 'reviewRequests')}
    maxRows={MAX_ROWS}
    filter={filter}
    update={update}
    onUpdate={onUpdate}
  />
);
