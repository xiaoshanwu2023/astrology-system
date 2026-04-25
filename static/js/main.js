// main.js
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('astrologyForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const fd = new FormData(form);
    const payload = {
      name: fd.get('name'),
      gender: fd.get('gender'),
      birthDate: fd.get('birthDate'),
      birthTime: fd.get('birthTime'),
      province: fd.get('province'),
      city: fd.get('city'),
      coordinates: fd.get('coordinates'),
      transitDate: fd.get('transitDate'),
      transitTime: fd.get('transitTime')
    };

    // 验证
    for (const k of ['name','birthDate','birthTime','province','city','coordinates','transitDate','transitTime']) {
      if (!payload[k]) {
        alert('请填写所有必填项：' + k);
        return;
      }
    }

    fetch('/calculate', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    })
    .then(r => r.json())
    .then(result => {
      if (result && result.success && result.redirect_url) {
        // 重定向到结果页
        window.location.href = result.redirect_url;
      } else {
        alert('后端返回错误：' + (result.error || JSON.stringify(result)));
        console.error('result', result);
      }
    })
    .catch(err => {
      alert('请求失败，请查看控制台详情');
      console.error(err);
    });
  });
});
