import type { AssessmentResult } from "@/data/assessmentData";
import { maturityLevels } from "@/data/assessmentData";
import type { KeywordRecommendation } from "@/data/keywordRecommendations";

function generateRadarSvg(dims: AssessmentResult["dims"]): string {
  const scored = dims.filter((d) => d.max > 0);
  if (scored.length < 3) return "";
  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const R = 150;
  const n = scored.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  const point = (i: number, r: number) => {
    const angle = startAngle + i * angleStep;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };

  // concentric rings
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];
  const gridLines = rings
    .map((pct) => {
      const pts = Array.from({ length: n }, (_, i) => point(i, R * pct).join(",")).join(" ");
      return `<polygon points="${pts}" fill="none" stroke="#d4e2ed" stroke-width="1"/>`;
    })
    .join("");

  // axis lines
  const axes = Array.from({ length: n }, (_, i) => {
    const [x, y] = point(i, R);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#d4e2ed" stroke-width="1"/>`;
  }).join("");

  // labels
  const labels = scored
    .map((d, i) => {
      const [x, y] = point(i, R + 24);
      const anchor = x < cx - 10 ? "end" : x > cx + 10 ? "start" : "middle";
      const name = d.label.length > 22 ? d.label.slice(0, 20) + "…" : d.label;
      return `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="central" font-size="11" fill="#444">${name}</text>`;
    })
    .join("");

  // data polygon
  const dataPoints = scored
    .map((d, i) => point(i, R * (d.pct / 100)).join(","))
    .join(" ");

  const dataPoly = `<polygon points="${dataPoints}" fill="rgba(30,90,150,0.22)" stroke="#1e5a96" stroke-width="2"/>`;

  // dots
  const dots = scored
    .map((d, i) => {
      const [x, y] = point(i, R * (d.pct / 100));
      return `<circle cx="${x}" cy="${y}" r="4" fill="#1e5a96"/>`;
    })
    .join("");

  return `<div style="text-align:center;margin:20px 0;">
    <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;">
      ${gridLines}${axes}${dataPoly}${dots}${labels}
    </svg>
  </div>`;
}

export async function generateHtmlReport(
  result: AssessmentResult,
  keywordRecs: KeywordRecommendation[]
): Promise<string> {
  const lvl = maturityLevels.find((l) => l.level === result.overallLevel);

  const levelColor = (level: number) => {
    const colors: Record<number, string> = {
      1: "#cc3333", 2: "#cc7a00", 3: "#2e7db3", 4: "#2d8a4e", 5: "#7c3aed",
    };
    return colors[level] || "#666";
  };

  const highPriority = keywordRecs.filter((r) => r.priority === "high");
  const mediumPriority = keywordRecs.filter((r) => r.priority === "medium");

  const renderRecs = (recs: KeywordRecommendation[]) =>
    recs
      .map(
        (rec) => `
      <div style="margin-bottom:18px;padding:14px 18px;background:#f4f8fb;border-radius:8px;border-left:4px solid ${rec.priority === "high" ? "#cc3333" : "#008b6e"};">
        <div style="font-weight:700;font-size:15px;color:#1e5a96;margin-bottom:2px;">${rec.keyword}</div>
        <div style="font-size:12px;color:#666;margin-bottom:10px;">${rec.dimensionLabel} · Level ${rec.currentLevel} → ${rec.targetLevel}</div>
        ${rec.actions
          .map(
            (a) => `
          <div style="margin-bottom:8px;">
            <div style="font-size:13px;color:#222;">▸ ${a.action}</div>
            <div style="font-size:12px;color:#888;margin-left:16px;font-style:italic;">💡 ${a.example}</div>
          </div>`
          )
          .join("")}
      </div>`
      )
      .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Board Member Maturity Report</title>
<style>
  body { font-family: 'DM Sans', 'Segoe UI', Arial, sans-serif; margin:0; padding:0; color:#222; background:#fff; }
  .header { background:#1e5a96; padding:28px 40px; display:flex; align-items:center; gap:24px; }
  .header img { height:54px; }
  .header h1 { color:#fff; font-size:22px; letter-spacing:6px; text-transform:uppercase; margin:0; font-weight:700; }
  .content { max-width:780px; margin:0 auto; padding:32px 40px; }
  .overall { background:#edf4f9; border-radius:10px; padding:20px 24px; margin-bottom:28px; }
  .overall h2 { margin:0 0 6px; font-size:20px; color:#1e5a96; }
  .level-badge { display:inline-block; padding:4px 14px; border-radius:20px; color:#fff; font-size:13px; font-weight:700; }
  table { width:100%; border-collapse:collapse; margin-bottom:28px; font-size:13px; }
  th { background:#1e5a96; color:#fff; text-align:left; padding:10px 14px; font-weight:600; }
  td { padding:8px 14px; border-bottom:1px solid #d4e2ed; }
  tr:nth-child(even) { background:#f4f8fb; }
  .section-title { font-size:16px; font-weight:700; color:#1e5a96; margin:28px 0 12px; border-bottom:2px solid #008b6e; padding-bottom:6px; }
  .footer { background:#1e5a96; padding:24px 40px; text-align:center; margin-top:40px; }
  .footer img { height:40px; margin-bottom:10px; }
  .footer p { color:#ccc; font-size:13px; letter-spacing:2px; margin:0; font-weight:700; }
  .footer a { color:#008b6e; text-decoration:none; font-weight:700; }
</style>
</head>
<body>

<div class="header">
  <h1>Board Member Maturity</h1>
</div>

<div class="content">
  <div class="overall">
    <h2>Overall Maturity: ${lvl?.label || "N/A"}</h2>
    <p style="margin:4px 0;font-size:14px;color:#444;">
      Score: <strong>${result.overallScore}/${result.overallMax}</strong> (${result.overallPct.toFixed(1)}%)
    </p>
    <p style="margin:4px 0;font-size:13px;color:#666;">${lvl?.tag || ""}</p>
  </div>

  <div class="section-title">Dimension Scores</div>
  <table>
    <thead>
      <tr><th>Dimension</th><th>Score</th><th>Max</th><th>%</th><th>Level</th></tr>
    </thead>
    <tbody>
      ${result.dims
        .map(
          (d) => `<tr>
        <td>${d.label}</td>
        <td>${d.score}</td>
        <td>${d.max}</td>
        <td>${d.max > 0 ? d.pct.toFixed(1) + "%" : "n/a"}</td>
        <td>${d.level > 0 ? `<span class="level-badge" style="background:${levelColor(d.level)}">${d.level}</span>` : "n/a"}</td>
      </tr>`
        )
        .join("")}
    </tbody>
  </table>

  <div class="section-title">Dimension Overview</div>
  ${generateRadarSvg(result.dims)}

  ${highPriority.length > 0 ? `<div class="section-title" style="color:#cc3333;border-color:#cc3333;">High Priority — Current Gaps</div>${renderRecs(highPriority)}` : ""}

  ${mediumPriority.length > 0 ? `<div class="section-title" style="color:#008b6e;">Medium Priority — In Progress</div>${renderRecs(mediumPriority)}` : ""}
</div>

<div class="footer">
  <p><a href="mailto:Joris@deltabase.be">Joris@deltabase.be</a> &nbsp;/&nbsp; +32 494 25 78 25</p>
</div>

</body>
</html>`;
}
