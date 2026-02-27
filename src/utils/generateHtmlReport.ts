import type { AssessmentResult } from "@/data/assessmentData";
import { maturityLevels } from "@/data/assessmentData";
import type { KeywordRecommendation } from "@/data/keywordRecommendations";
import jorisLogoUrl from "@/assets/joris-logo.png";

async function imageToBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

export async function generateHtmlReport(
  result: AssessmentResult,
  keywordRecs: KeywordRecommendation[]
): Promise<string> {
  const logoBase64 = await imageToBase64(jorisLogoUrl);
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
      <div style="margin-bottom:18px;padding:14px 18px;background:#f8f9fb;border-radius:8px;border-left:4px solid ${rec.priority === "high" ? "#cc3333" : "#b8963e"};">
        <div style="font-weight:700;font-size:15px;color:#1a2456;margin-bottom:2px;">${rec.keyword}</div>
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
  body { font-family: 'Segoe UI', Arial, sans-serif; margin:0; padding:0; color:#222; background:#fff; }
  .header { background:#1a2456; padding:28px 40px; display:flex; align-items:center; gap:24px; }
  .header img { height:54px; }
  .header h1 { color:#fff; font-size:22px; letter-spacing:6px; text-transform:uppercase; margin:0; font-weight:700; }
  .content { max-width:780px; margin:0 auto; padding:32px 40px; }
  .overall { background:#f0f2f8; border-radius:10px; padding:20px 24px; margin-bottom:28px; }
  .overall h2 { margin:0 0 6px; font-size:20px; color:#1a2456; }
  .level-badge { display:inline-block; padding:4px 14px; border-radius:20px; color:#fff; font-size:13px; font-weight:700; }
  table { width:100%; border-collapse:collapse; margin-bottom:28px; font-size:13px; }
  th { background:#1a2456; color:#fff; text-align:left; padding:10px 14px; font-weight:600; }
  td { padding:8px 14px; border-bottom:1px solid #e0e3ea; }
  tr:nth-child(even) { background:#f8f9fb; }
  .section-title { font-size:16px; font-weight:700; color:#1a2456; margin:28px 0 12px; border-bottom:2px solid #b8963e; padding-bottom:6px; }
  .footer { background:#1a2456; padding:24px 40px; text-align:center; margin-top:40px; }
  .footer img { height:40px; margin-bottom:10px; }
  .footer p { color:#ccc; font-size:13px; letter-spacing:2px; margin:0; font-weight:700; }
  .footer a { color:#b8963e; text-decoration:none; font-weight:700; }
</style>
</head>
<body>

<div class="header">
  <img src="${logoBase64}" alt="Logo" />
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

  ${highPriority.length > 0 ? `<div class="section-title" style="color:#cc3333;border-color:#cc3333;">High Priority — Current Gaps</div>${renderRecs(highPriority)}` : ""}

  ${mediumPriority.length > 0 ? `<div class="section-title" style="color:#b8963e;">Medium Priority — In Progress</div>${renderRecs(mediumPriority)}` : ""}
</div>

<div class="footer">
  <img src="${logoBase64}" alt="Logo" /><br/>
  <p><a href="mailto:Joris@deltabase.be">Joris@deltabase.be</a> &nbsp;/&nbsp; +32 494 25 78 25</p>
</div>

</body>
</html>`;
}
