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

const Columns = [
  {
    title: 'Task-Name',
    dataIndex: 'id',
    width: '30%',
    editable: true,
    searched: true,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    // sorter: true,
    // sorter: (a, b) => {
    //   console.log(a);
    //   return a.author - b.author;
    // },
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    searched: true,
    onFilter: (value, record) => {
      console.log('onFilter', value, record);
      return value;
    },
    sorter: (a, b) => {
      const nameA = a.author.toLowerCase();
      const nameB = b.author.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) return 1;
      return 0; // Никакой сортировки
    },
  },
  {
    title: 'Score',
    dataIndex: 'score',
    sorter: (a, b) => a.score - b.score,
  },
  {
    title: 'State',
    dataIndex: 'state',

  },
  {
    title: 'Reviewer',
    width: '30%',
    dataIndex: 'reviewer',

  },
];
const data = [
  {
    id: 'rev-id-1',
    requestId: 'rev-req-1',
    author: 'ButterBrot777',
    state: 'DISPUTED',
    score: 2,
    grade: {},
  },
  {
    id: 'rev-id-2',
    requestId: 'rev-req-2',
    author: 'rsschool1',
    state: 'DISPUTED',
    score: 4,
    grade: {},
  },
  {
    id: 'rev-id-3',
    requestId: 'rev-req-3',
    author: 'rsschool-3',
    state: 'DISPUTED',
    score: 1,
    grade: {},
  },
  {
    id: 'rev-id-4',
    requestId: 'rev-req-4',
    author: 'rsschool-4',
    state: 'DISPUTED',
    score: 3,
    grade: {},
  },
  {
    id: 'rev-id-5',
    requestId: 'rev-req-5',
    author: 'rsschool-5',
    state: 'DISPUTED',
    score: 5,
    grade: {},
  },
];

// {
//   "id": "rev-id-4",
//   "requestId": "rev-req-2",
//   "author": "rgovin",
//   "state": "DISPUTED",
//   "grade": {}
// }

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
  //     const result = await response.json(); console.log(result) //готовый массив обьектов для запроса//
  //   }
  // })
  const [searchState, setSearchState] = useState({
    text: '',
    column: '',
  });
  const dataSource = useSelector((item) => item.reviewReducer);
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const [columns, setColumns] = useState(Columns);
  const handleReset = useCallback((clearFilters) => {
    clearFilters();

    setSearchState({
      ...searchState,
      text: '',
    });
    // this.setState({ searchText: '' });
  });

  const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
    confirm();
    console.log('@ : ', selectedKeys, confirm, dataIndex);
    // dispatch(filter())
    setSearchState({
      text: selectedKeys[0],
      column: dataIndex,
    });
    // this.setState({
    //   searchText: selectedKeys[0],
    //   searchedColumn: dataIndex,
    // });
  }, [dataSource]);

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
      //   text: selectedKeys[0],
      //   column: dataIndex,
      // });searchState
      render: (text) => {
          console.log('render', searchState.column, dataIndex);
        return (searchState.column === dataIndex
          ? (<Highlighter
            highlightStyle={{backgroundColor : '#ffc069', padding : 0}}
            searchWords={[]} // [this.state.searchText]
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />)
          : text);
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
      <Table dataSource={data.map((el, i) => {
        el.key = i;
        return el;
      })} columns={columns}/>;
    </>
  );
};

export default Reviews;

