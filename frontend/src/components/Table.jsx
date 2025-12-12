export default function Table({ columns, data, renderActions }) {
  // Petite sécurité si data est vide pour éviter un crash
  if (!data) return <div style={{ color: "white", padding: "20px" }}>Chargement...</div>;

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
                {/* CORRECTION ICI : On vérifie si une règle 'cell' existe */}
                {col.cell 
                  ? col.cell(row[col.accessor], row) // Si oui, on utilise ta fonction personnalisée (boutons, couleurs...)
                  : row[col.accessor] // Sinon, on affiche le texte brut
                }
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
    verticalAlign: "middle", // Ajouté pour centrer les boutons verticalement
  },
};