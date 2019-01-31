import * as React from 'react';

interface Props {
    columns: Array<ColumnStaticTable>;
}

class StaticTable extends React.Component<Props, {}> {
    render() {
        const {columns} = this.props;

        return (
            <>
            {
                columns && columns.length > 0 ?
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            {
                                columns.map((col, index) => (
                                    <th key={index} className={col.className}>{col.name}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.children}
                    </tbody>
                </table> :
                null
            }
            </>
        );
    }
}

export default StaticTable;

export class ColumnStaticTable {
    name: string;
    className?: string;
}