import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}
export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex gap-6 lg:gap-8">
      <div>
        <Select
          className="h-8"
          value={table.getState().pagination.pageSize}
          onChange={(value: number) => {
            table.setPageSize(value);
          }}
          options={[5, 10, 15].map((perPage: number) => ({
            label: `${perPage}`,
            value: perPage,
          }))}
        />
      </div>
      <div className="flex items-center gap-2">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <Icons.ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <Icons.ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <Icons.ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <Icons.ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
