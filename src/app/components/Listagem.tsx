import * as React from "react";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridLogicOperator,
  GridToolbar,
} from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import { fetchListagem } from "../../lib/api";
import Preloader from "./Preloader";

interface Post {
  id: string;
  nome: string;
  telefone: string;
  data_de_cadastro: string;
  status: string;
}

const CustomFilterPanelContent: React.FC = () => {
  const [orderBy, setOrderBy] = React.useState("");

  const [posts, setPosts] = React.useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("");
  const [pageSize, setPageSize] = React.useState<number>(10);

  const [loading, setLoading] = React.useState(true);

  const [page, setPage] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedPost, setSelectedPost] = React.useState<null | Post>(null);

  React.useEffect(() => {
    setLoading(true);
    fetchListagem()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [fetchListagem]);

  const handleOrderByChange = (e: SelectChangeEvent<string>) => {
    setOrderBy(e.target.value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const comparators: { [key: string]: (a: Post, b: Post) => number } = {
    id: (a, b) => parseInt(a.id) - parseInt(b.id),
    nome: (a, b) => a.nome.localeCompare(b.nome),
    telefone: (a, b) => a.telefone.localeCompare(b.telefone),
    data_de_cadastro: (a, b) =>
      a.data_de_cadastro.localeCompare(b.data_de_cadastro),
    status: (a, b) => a.status.localeCompare(b.status),
  };

  const filteredPosts = posts
    .filter(
      (post) =>
        post.id.toLowerCase().includes(searchTerm) ||
        post.nome.toLowerCase().includes(searchTerm) ||
        post.telefone.toLowerCase().includes(searchTerm)
    )
    .filter((post) => !filterStatus || post.status === filterStatus)
    .sort(comparators[orderBy] || (() => 0));

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    post: Post
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(post);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedPost(null);
  };

  const handleMenuItemClick = (status: string) => {
    if (selectedPost) {
      const updatedPosts = posts.map((post) =>
        post.id === selectedPost.id ? { ...post, status } : post
      );
      setPosts(updatedPosts);
    }
    handlePopoverClose();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 100 },
    { field: "nome", headerName: "Nome", flex: 2, minWidth: 150 },
    {
      field: "telefone",
      headerName: "Telefone",
      flex: 2,
      renderCell: (params) => formatPhoneNumber(params.value),
      minWidth: 150,
    },
    {
      field: "data_de_cadastro",
      headerName: "Data de Cadastro",
      flex: 2,
      renderCell: (params) => formatDate(params.value),
      minWidth: 200,
    },
    {
      field: "status",
      minWidth: 120,
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Typography
          className={
            params.value === "Ativo" ? "status-ativo" : "status-inativo"
          }
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "acoes",
      headerName: "Ações",
      minWidth: 100,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          onClick={(event) => handlePopoverOpen(event, params.row)}
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px 40px", width: "100%" }}>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Typography variant="h5" color="secondary" mb={3} mt={2}>
            Usuários
          </Typography>
          <div
            className="search-container"
            style={{
              marginBottom: 16,
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <TextField
              className="search-input"
              label="Pesquisar ID ou nome ou telefone..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FormControl
              className="select-control"
              variant="outlined"
              color="primary"
            >
              <InputLabel>Ordenar por</InputLabel>
              <Select
                className="select"
                value={orderBy}
                onChange={handleOrderByChange}
                label="Ordenar por"
                native={false}
                style={{ width: "100%" }}
              >
                <MenuItem value="">Selecione...</MenuItem>
                <MenuItem value="id">ID</MenuItem>
                <MenuItem value="nome">Nome</MenuItem>
                <MenuItem value="telefone">Telefone</MenuItem>
                <MenuItem value="data_de_cadastro">Data de Cadastro</MenuItem>
                <MenuItem value="status">Status</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Box
            style={{
              height: "calc(100vh - 250px)",
              width: "100%",
              overflowX: "auto",
            }}
          >
            <DataGrid
              rows={filteredPosts}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[10, 20, 30]}
              pagination
              paginationMode="client"
              onPageSizeChange={(newPageSize: number) =>
                setPageSize(newPageSize)
              }
              onPageChange={(newPage: number) => setPage(newPage)}
              page={page}
              disableSelectionOnClick
              getRowClassName={(params) =>
                params.row.status === "Inativo" ? "inactive-row" : ""
              }
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                filterPanel: {
                  logicOperators: [GridLogicOperator.And],
                  columnsSort: "asc",
                  filterFormProps: {
                    logicOperatorInputProps: {
                      variant: "outlined",
                      size: "small",
                    },
                    columnInputProps: {
                      variant: "outlined",
                      size: "small",
                      sx: { mt: "auto" },
                    },
                    operatorInputProps: {
                      variant: "outlined",
                      size: "small",
                      sx: { mt: "auto" },
                    },
                    valueInputProps: {
                      InputComponentProps: {
                        variant: "outlined",
                        size: "small",
                      },
                    },
                    deleteIconProps: {
                      sx: {
                        "& .MuiSvgIcon-root": { color: "#d32f2f" },
                      },
                    },
                  },
                  sx: {
                    "& .MuiDataGrid-filterForm": { p: 2 },
                    "& .MuiDataGrid-filterForm:nth-child(even)": {
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#444" : "#f5f5f5",
                    },
                    "& .MuiDataGrid-filterFormLogicOperatorInput": { mr: 2 },
                    "& .MuiDataGrid-filterFormColumnInput": {
                      mr: 2,
                      width: 150,
                    },
                    "& .MuiDataGrid-filterFormOperatorInput": { mr: 2 },
                    "& .MuiDataGrid-filterFormValueInput": { width: 200 },
                  },
                },
              }}
            />
          </Box>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              style: {
                paddingBottom: 0,
                borderRadius: 8,
                boxShadow: "none",
                border: "1px solid #E2E2E2",
                width: 200,
                height: 150,
              },
            }}
            classes={{
              paper: "custom-popover-paper",
            }}
          >
            <Typography color="secondary" pt={1.5} pl={2} pb={1.5}>
              Mudar Status
            </Typography>
            <div
              className="w-full"
              style={{ background: "#E2E2E2", height: 1 }}
            ></div>
            <List style={{ paddingTop: 0, paddingBottom: 0 }}>
              <ListItem
                style={{ cursor: "pointer" }}
                onClick={() => handleMenuItemClick("Ativo")}
              >
                <ListItemIcon className="green-icon">
                  <CheckCircleOutlineIcon style={{ width: 30 }} />
                </ListItemIcon>
                <ListItemText className="green-icon" primary="Ativar" />
              </ListItem>
              <ListItem
                style={{ cursor: "pointer" }}
                onClick={() => handleMenuItemClick("Inativo")}
              >
                <ListItemIcon className="red-icon">
                  <BlockIcon style={{ width: 30 }} />
                </ListItemIcon>
                <ListItemText className="red-icon" primary="Inativar" />
              </ListItem>
            </List>
          </Popover>
        </>
      )}
    </div>
  );
};

export default CustomFilterPanelContent;
