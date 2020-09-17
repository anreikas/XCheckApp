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
// const Reviews = (props) => (
//   <div className="review__table">
//     <Paper >
//       <TableContainer>
//         <Table
//           aria-labelledby="tableTitle"
//           size='small'
//           aria-label="enhanced table"
//         >
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox">
//                 <Checkbox
//                 />
//               </TableCell>
//               {[1, 2, 3, 4, 5].map((id) => (
//                 <TableCell
//                   key={id}
//                   align={'center'}
//                   padding={'default'}
//                   sortDirection="asc"
//                 >
//                   <TableSortLabel
//                     active={1}
//                     direction={id % 2 ? 'asc' : 'desc'}
//                   >
//                     {id}
//                   </TableSortLabel>
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow
//               hover
//               role="checkbox"
//               tabIndex={-1}
//               key={1}
//             >
//               <TableCell padding="checkbox">
//                 <Checkbox
//                   checked="false"
//                 />
//               </TableCell>
//               <TableCell align="center">row name</TableCell>
//               <TableCell align="center">calories</TableCell>
//               <TableCell align="center">fat</TableCell>
//               <TableCell align="center">carbs</TableCell>
//               <TableCell align="center">protein</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   </div>
// );

export default Reviews;

/*
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
*/
