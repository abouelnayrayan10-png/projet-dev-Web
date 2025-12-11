// Composant de tableau générique réutilisable
// props : columns (tableau d'objets { header, accessor })
//         data (tableau de lignes)
//         renderActions (optionnel : fonction qui retourne des boutons d'action)
 
export default function Table({ columns, data, renderActions }) {
  return (
<table style={{ borderCollapse: "collapse", width: "100%" }}>
<thead>
<tr>
          {columns.map((col) => (
<th
              key={col.accessor}
              style={{ border: "1px solid #ccc", padding: "8px" }}
>
              {col.header}
</th>
          ))}
          {renderActions && (
<th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
          )}
</tr>
</thead>
<tbody>
        {data.length === 0 && (
<tr>
<td
              colSpan={columns.length + (renderActions ? 1 : 0)}
              style={{ padding: "8px", textAlign: "center" }}
>
              Aucune donnée
</td>
</tr>
        )}
 
        {data.map((row) => (
<tr key={row.id}>
            {columns.map((col) => (
<td
                key={col.accessor}
                style={{ border: "1px solid #ccc", padding: "8px" }}
>
                {row[col.accessor]}
</td>
            ))}
            {renderActions && (
<td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {renderActions(row)}
</td>
            )}
</tr>
        ))}
</tbody>
</table>
  );
}