/* eslint-disable no-unused-vars,no-irregular-whitespace */
import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { ADD_REVIEW } from './actions/types';
import Highlighter from 'react-highlight-words';

// import {lighten, makeStyles} from '@material-ui/core/styles';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer
//   TableHead,
//   TablePagination,
//   TableRow,
//   TableSortLabel,
//   Toolbar,
//   Typography,
//   Paper,
//   Checkbox,
//   IconButton,
//   Tooltip,
//   FormControlLabel,
//   Switch,
//   DeleteIcon,
//   FilterListIcon,
// } from '@material-ui/core';

import 'antd/dist/antd.css';
// import './index.css';

import {
  Table, Tag, Space, Input, Button, Popconfirm, Form,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Reviews.scss';
import './styles.scss';
import { addReview, deleteReview, filter } from './actions';

const { Search } = Input;
// author: "ButterBrot777"
// grade: {}
// id: "rev-id-1"
// key: "rev-id-1"
// requestId: "rev-req-1"
// state: "DISPUTED"

const textSorter = (a, b) => {
  const nameA = a.author.toLowerCase();
  const nameB = b.author.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) return 1;
  return 0; // Никакой сортировки
};

const Columns = [
  {
    title: 'Task-Name',
    dataIndex: 'id',
    width: '30%',
    editable: true,
    searched: true,
    sorter: textSorter,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    searched: true,
    sorter: textSorter,
  },
  {
    title: 'Score',
    dataIndex: 'score',
    sorter: (a, b) => a.score - b.score,
  },
  {
    title: 'State',
    dataIndex: 'state',
    sorter: textSorter,
  },
  {
    title: 'Reviewer',
    width: '30%',
    dataIndex: 'reviewer',
    sorter: textSorter,
  },
];
const setUsers = (data) => ({ type: ADD_REVIEW, data });
const fetchUsers = () => async (dispatch) => {
  const response = await fetch('http://x-check.herokuapp.com/reviews');
  console.log(response);
  if (response.ok) {
    const data = await response.json();

    dispatch(setUsers(data.map((el) => (el.key = el.id, el))));
  }
};

const Reviews = () => {
  // const fetchReviews = useCallback(async () => {
  //   const response = await fetch("http://x-check.herokuapp.com/reviews");
  //   if (response.ok) {
  //     const result = await response.json(); console.log(result) // готовый массив обьектов для запроса//
  //   }
  // })

  const dataSource = useSelector((item) => item.reviewReducer);
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const searchState = useRef({
    text: '',
    column: '',
  });
  const [columns, setColumns] = useState(Columns);
  const handleReset = useCallback((clearFilters) => {
    clearFilters();

    searchState.current = {
      ...searchState,
      text: '',
    };
  });

  const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
    searchState.current = {
      text: selectedKeys[0],
      column: dataIndex,
    };
    confirm();
  });

  const getColumnSearchProps = useCallback(
    (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              searchInput.current = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined/>}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small"
                    style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined
        style={{ color: filtered ? '#1890ff' : undefined }}/>,
      onFilter: (value, record) => (record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : ''),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current.select(), 100);
        }
      },
      render: (handleText) => {
        const { current: { column, text } } = searchState;

        return (column === dataIndex
          ? (<Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[text]} // [this.state.searchText]
            autoEscape
            textToHighlight={handleText ? handleText.toString() : ''}
          />)
          : handleText);
      },
    }),
    [searchState],
  );

  console.log('@Reviews : dispatch ', dispatch);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    const columnsWithProps = columns.map((column) => {
      const { searched } = column;

      if (searched) {
        return {
          ...column,
          ...getColumnSearchProps(column.dataIndex),
        };
      }
      return column;
    });

    setColumns(columnsWithProps);
  }, []);

  console.log('>', dataSource);

  return (
    <>
      <Table dataSource={dataSource} columns={columns}/>;
    </>
  );
};

export default Reviews;
