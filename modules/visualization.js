import { hasScene3D, renderScene3DPanel, initScene3D, disposeScenes3D } from "./scene3d.js";

export function renderVisualization(config = {}) {
  const type = config.visualization;
  const panel3d = hasScene3D(type) ? renderScene3DPanel(type, config.caption) : "";
  const legacy = renderLegacyVisualization(config);
  if (panel3d) {
    return `
      ${panel3d}
      <details class="viz-2d-alt">
        <summary>Sơ đồ 2D bổ sung</summary>
        ${legacy}
      </details>
    `;
  }
  return legacy;
}

export function bindVisualizations(root = document) {
  disposeScenes3D();
  initScene3D(root);
}

function renderLegacyVisualization(config = {}) {
  const type = config.visualization;
  if (type === "khtn") return renderKhtnViz();
  if (type === "lab") return renderLabViz();
  if (type === "magnifier") return renderMagnifierViz();
  if (type === "microscope") return renderMicroscopeViz();
  if (type === "diversity") return renderDiversityViz();
  if (type === "microorganism") return renderMicroorganismViz();
  if (type === "plant") return renderPlantViz();
  if (type === "animal") return renderAnimalViz();
  if (type === "cell") return renderCellViz();
  if (type === "organelle") return renderOrganelleViz();
  if (type === "photosynthesis") return renderPhotosynthesisViz();
  if (type === "respiration") return renderRespirationViz();
  if (type === "digestion") return renderDigestionViz();
  if (type === "circulation") return renderCirculationViz();
  if (type === "nervous") return renderNervousViz();
  if (type === "reproduction") return renderReproductionViz();
  if (type === "genetics") return renderGeneticsViz();
  if (type === "evolution") return renderEvolutionViz();
  if (type === "ecosystem") return renderEcosystemViz();
  if (type === "environment") return renderEnvironmentViz();
  if (type === "biotechnology") return renderBiotechViz();
  return renderConceptViz(type);
}

function renderKhtnViz() {
  return `
    <div class="viz concept-viz" aria-label="Ba lĩnh vực KHTN">
      <div class="khtn-pillars">
        <span>Vật lí</span><span>Sinh học</span><span>Hóa học</span>
      </div>
      <p class="viz-caption">Sinh học nghiên cứu sự sống — từ tế bào đến hệ sinh thái</p>
    </div>
  `;
}

function renderLabViz() {
  return `
    <div class="viz lab-viz" aria-label="An toàn phòng thí nghiệm">
      <div class="lab-item">Kính bảo hộ</div>
      <div class="lab-item">Găng tay</div>
      <div class="lab-item">Kính hiển vi</div>
      <p class="viz-caption">Quan sát mẫu sinh học an toàn, không nếm ngửi tùy tiện</p>
    </div>
  `;
}

function renderMagnifierViz() {
  return `
    <div class="viz magnifier-viz" aria-label="Kính lúp">
      <div class="microscope-body">🔍 Kính lúp</div>
      <div class="valence-chips"><span>Gân lá</span><span>Cánh côn trùng</span><span>Bề mặt hạt</span></div>
      <p class="viz-caption">Phóng đại vài lần — bước đệm trước khi dùng kính hiển vi</p>
    </div>
  `;
}

function renderMicroscopeViz() {
  return `
    <div class="viz microscope-viz" aria-label="Kính hiển vi">
      <div class="microscope-body">🔬 Kính hiển vi</div>
      <div class="valence-chips"><span>Lam kính</span><span>Điều chỉnh ánh sáng</span><span>Vẽ hình quan sát</span></div>
      <p class="viz-caption">Phóng đại cấu trúc tế bào thực vật, vi khuẩn...</p>
    </div>
  `;
}

function renderDiversityViz() {
  return `
    <div class="viz diversity-viz" aria-label="Đa dạng sinh học">
      <div class="valence-chips"><span>🌿 Thực vật</span><span>🦋 Động vật</span><span>🦠 Vi sinh</span><span>🍄 Nấm</span></div>
      <p class="viz-caption">Đa dạng ở cấp độ gen, loài và hệ sinh thái</p>
    </div>
  `;
}

function renderMicroorganismViz() {
  return `
    <div class="viz micro-viz" aria-label="Vi sinh vật">
      <div class="substance-row"><strong>Vi khuẩn</strong><span>Đơn bào, không nhân</span></div>
      <div class="substance-row"><strong>Nấm</strong><span>Đa bào, hút chất hữu cơ</span></div>
      <div class="substance-row"><strong>Virus</strong><span>Cần tế bào chủ để sinh sản</span></div>
    </div>
  `;
}

function renderPlantViz() {
  return `
    <div class="viz plant-viz" aria-label="Thực vật">
      <div class="plant-diagram">
        <span class="plant-part root">Rễ</span>
        <span class="plant-part stem">Thân</span>
        <span class="plant-part leaf">Lá</span>
        <span class="plant-part flower">Hoa</span>
      </div>
      <p class="viz-caption">Thực vật quang hợp, có thành phần cellulose</p>
    </div>
  `;
}

function renderAnimalViz() {
  return `
    <div class="viz animal-viz" aria-label="Động vật">
      <div class="valence-chips"><span>Không xương sống</span><span>Cá – lưỡng cư</span><span>Bò sát – chim</span><span>Thú</span></div>
      <p class="viz-caption">Động vật dị dưỡng, di chuyển chủ động</p>
    </div>
  `;
}

function renderCellViz() {
  return `
    <div class="viz cell-viz" aria-label="Tế bào">
      <div class="cell-diagram">
        <span class="cell-part nucleus">Nhân</span>
        <span class="cell-part cytoplasm">Tế bào chất</span>
        <span class="cell-part membrane">Màng</span>
      </div>
      <p class="viz-caption">Tế bào là đơn vị cơ bản của sự sống</p>
    </div>
  `;
}

function renderOrganelleViz() {
  return `
    <div class="viz organelle-viz" aria-label="Bào quan">
      <div class="valence-chips"><span>Nhân</span><span>Lục lạp</span><span>Ti thể</span><span>Đvacuole</span><span>Ribosome</span></div>
      <p class="viz-caption">Mỗi bào quan có chức năng riêng trong tế bào</p>
    </div>
  `;
}

function renderPhotosynthesisViz() {
  return `
    <div class="viz photo-viz" aria-label="Quang hợp">
      <div class="heat-flow">
        <span>CO₂ + H₂O</span><span class="heat-arrow">→</span><span>C₆H₁₂O₆ + O₂</span>
      </div>
      <p class="viz-caption">Diễn ra ở lục lạp, cần ánh sáng</p>
    </div>
  `;
}

function renderRespirationViz() {
  return `
    <div class="viz resp-viz" aria-label="Hô hấp">
      <div class="heat-flow">
        <span>C₆H₁₂O₆ + O₂</span><span class="heat-arrow">→</span><span>CO₂ + H₂O + năng lượng</span>
      </div>
      <p class="viz-caption">Mọi tế bào sống đều hô hấp để giải phóng năng lượng</p>
    </div>
  `;
}

function renderDigestionViz() {
  return `
    <div class="viz digestion-viz" aria-label="Tiêu hóa">
      <div class="valence-chips"><span>Miệng</span><span>Dạ dày</span><span>Ruột non</span><span>Ruột già</span></div>
      <p class="viz-caption">Biến thức ăn thành chất hấp thu được</p>
    </div>
  `;
}

function renderCirculationViz() {
  return `
    <div class="viz circulation-viz" aria-label="Tuần hoàn">
      <div class="circuit-diagram">
        <span class="circuit-battery">❤️ Tim</span>
        <span class="circuit-wire">→ Máu →</span>
        <span class="circuit-resistor">Mạch máu</span>
      </div>
      <p class="viz-caption">Tim bơm máu mang oxy và chất dinh dưỡng</p>
    </div>
  `;
}

function renderNervousViz() {
  return `
    <div class="viz nervous-viz" aria-label="Thần kinh">
      <div class="valence-chips"><span>🧠 Não</span><span>Tủy sống</span><span>Dây thần kinh</span></div>
      <p class="viz-caption">Điều hòa và phản xạ — kích thích → phản ứng</p>
    </div>
  `;
}

function renderReproductionViz() {
  return `
    <div class="viz repro-viz" aria-label="Sinh sản">
      <div class="compare-row">
        <span>Sinh sản vô tính</span><span>→</span><span>Sinh sản hữu tính</span>
      </div>
      <p class="viz-caption">Đảm bảo nòi giống và đa dạng gen</p>
    </div>
  `;
}

function renderGeneticsViz() {
  return `
    <div class="viz genetics-viz" aria-label="Di truyền">
      <div class="formula-chip">Gen → tính trạng</div>
      <p class="viz-caption">ADN mang thông tin di truyền; gen là đoạn ADN mã hóa tính trạng</p>
    </div>
  `;
}

function renderEvolutionViz() {
  return `
    <div class="viz evolution-viz" aria-label="Tiến hóa">
      <div class="galaxy-spiral">🌳 Cây tiến hóa</div>
      <p class="viz-caption">Quá trình thay đổi loài qua nhiều thế hệ — chọn lọc tự nhiên</p>
    </div>
  `;
}

function renderEcosystemViz() {
  return `
    <div class="viz ecosystem-viz" aria-label="Hệ sinh thái">
      <div class="food-chain">
        <span>Thực vật</span><span>→</span><span>Động vật ăn cỏ</span><span>→</span><span>Động vật ăn thịt</span>
      </div>
      <p class="viz-caption">Chuỗi thức ăn và luân chuyển vật chất</p>
    </div>
  `;
}

function renderEnvironmentViz() {
  return `
    <div class="viz env-viz" aria-label="Môi trường">
      <div class="valence-chips"><span>♻️ Tái chế</span><span>🌳 Trồng cây</span><span>💧 Tiết kiệm nước</span></div>
      <p class="viz-caption">Bảo vệ đa dạng sinh học và giảm ô nhiễm</p>
    </div>
  `;
}

function renderBiotechViz() {
  return `
    <div class="viz biotech-viz" aria-label="Công nghệ sinh học">
      <div class="valence-chips"><span>🧬 ADN tái tổ hợp</span><span>🍞 Lên men</span><span>💉 Vắc-xin</span></div>
      <p class="viz-caption">Ứng dụng sinh vật vào y học, nông nghiệp, công nghiệp</p>
    </div>
  `;
}

function renderConceptViz(type = "concept") {
  return `
    <div class="viz concept-viz" aria-label="Khái niệm Sinh học">
      <span>${type}</span>
      <p class="viz-caption">Minh họa khái niệm Sinh học THCS</p>
    </div>
  `;
}
