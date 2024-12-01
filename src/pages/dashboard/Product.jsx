import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Navigation from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Footer from "../../component/Footer";

const Product = () => {
  return (
    <>
      <div>
        <Navigation />
        <div className="flex">
          <div>
            <Sidebar />
          </div>
          <div className="flex flex-col p-8 gap-8 w-full">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">PRODUCT</h2>
              <Button>Tambah Product</Button>
            </div>
            <div>
              <Table aria-label="Customer">
                <TableHeader className="flex items-center justify-center">
                  <TableColumn>No</TableColumn>
                  <TableColumn>Nama Customer</TableColumn>
                  <TableColumn>Nomer Handphone</TableColumn>
                  <TableColumn>Alamat</TableColumn>
                  <TableColumn className="flex items-center justify-center">
                    Action
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>1</TableCell>
                    <TableCell>Jhone</TableCell>
                    <TableCell>08984474</TableCell>
                    <TableCell>Serang</TableCell>
                    <TableCell className="flex justify-center gap-4">
                      <Button>Edit</Button>
                      <Button>Hapus</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow key="1">
                    <TableCell>1</TableCell>
                    <TableCell>Jhone</TableCell>
                    <TableCell>08984474</TableCell>
                    <TableCell>Serang</TableCell>
                    <TableCell className="flex justify-center gap-4">
                      <Button>Edit</Button>
                      <Button>Hapus</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow key="1">
                    <TableCell>1</TableCell>
                    <TableCell>Jhone</TableCell>
                    <TableCell>08984474</TableCell>
                    <TableCell>Serang</TableCell>
                    <TableCell className="flex justify-center gap-4">
                      <Button>Edit</Button>
                      <Button>Hapus</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow key="1">
                    <TableCell>1</TableCell>
                    <TableCell>Jhone</TableCell>
                    <TableCell>08984474</TableCell>
                    <TableCell>Serang</TableCell>
                    <TableCell className="flex justify-center gap-4">
                      <Button>Edit</Button>
                      <Button>Hapus</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Product;
