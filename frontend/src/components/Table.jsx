export default function Table({ columns, data, renderActions }) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.header} style={styles.th}>{col.header}</th>
          ))}
          {renderActions && <th style={styles.th}>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id} style={styles.tr}>
            {columns.map((col) => (
              <td key={col.accessor} style={styles.td}>
                {row[col.accessor]}
              </td>
            ))}
            {renderActions && (
              <td style={styles.td}>{renderActions(row)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "1px solid #00e1ff33",
    background: "#0d1327",
    color: "#d8eeff",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    padding: "14px",
    background: "#091021",
    color: "#00e1ff",
    borderBottom: "2px solid #00e1ff55",
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid #00e1ff22",
  },
  td: {
    padding: "12px",
  },
};
