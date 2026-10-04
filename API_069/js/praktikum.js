/* Tampilan dan interaksi untuk tiga menu tugas. Bootstrap SB Admin 2 tetap digunakan. */
(function () {
    'use strict';
    const page = document.body.dataset.page;
    const api = window.LabAPI;
    const $ = window.jQuery;
    const el = id => document.getElementById(id);
    const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    const definitions = {
        asset: {
            title: 'Asset', key: 'id',
            fields: [
                ['nama_asset', 'Nama asset', 'text'], ['kategori', 'Kategori', 'text'],
                ['jumlah', 'Jumlah', 'number', 0], ['kondisi', 'Kondisi', 'text'],
                ['lokasi', 'Lokasi', 'text'], ['status', 'Status', 'text']
            ],
            columns: [['id', 'ID'], ['nama_asset', 'Nama asset'], ['kategori', 'Kategori'], ['jumlah', 'Jumlah'], ['kondisi', 'Kondisi'], ['lokasi', 'Lokasi'], ['status', 'Status']]
        },
        mahasiswa: {
            title: 'Mahasiswa', key: 'id',
            fields: [
                ['nim', 'NIM', 'text'], ['nama', 'Nama mahasiswa', 'text'],
                ['jurusan', 'Jurusan', 'text'], ['angkatan', 'Angkatan', 'number', 1900],
                ['email', 'Email', 'email'], ['telepon', 'Telepon', 'tel']
            ],
            columns: [['id', 'ID'], ['nim', 'NIM'], ['nama', 'Nama mahasiswa'], ['jurusan', 'Jurusan'], ['angkatan', 'Angkatan'], ['email', 'Email'], ['telepon', 'Telepon']]
        },
        peminjaman: {
            title: 'Peminjaman', key: 'id_peminjaman',
            fields: [
                ['id_mahasiswa', 'Mahasiswa', 'select'], ['id_asset', 'Asset', 'select'],
                ['jumlah', 'Jumlah dipinjam', 'number', 1], ['tanggal_pinjam', 'Tanggal pinjam', 'date'],
                ['tanggal_kembali', 'Tanggal kembali', 'date'], ['status_peminjaman', 'Status awal', 'text'],
                ['keterangan', 'Keterangan', 'textarea']
            ],
            columns: [['id_peminjaman', 'ID'], ['nama_mahasiswa', 'Mahasiswa'], ['nim', 'NIM'], ['nama_asset', 'Asset'], ['jumlah', 'Jumlah'], ['tanggal_pinjam', 'Tanggal pinjam'], ['tanggal_kembali', 'Tanggal kembali'], ['status_peminjaman', 'Status']]
        }
    };
    const definition = definitions[page];
    let editId = null;
    let table = null;
    let busy = false;
    let loading = false;
    let optionToken = 0;
    function notice(message, type = 'danger', target = 'notice') {
        el(target).innerHTML = message ? '<div class="alert alert-' + type + '">' + escapeHTML(message) + '</div>' : '';
    }
    function getId(row) {
        if (row[definition.key] == null) throw new Error('ID data tidak tersedia. Muat ulang daftar.');
        return row[definition.key];
    }
    function detailURL(id) { return page + '/detail.php?' + definition.key + '=' + encodeURIComponent(id); }
    async function loadData() {
        if (loading) return false;
        loading = true;
        el('refreshButton').disabled = true;
        if (el('loadStatus')) el('loadStatus').textContent = 'Memuat data dari API…';
        try {
            if (page === 'index') {
                const names = ['asset', 'mahasiswa', 'peminjaman'];
                const results = await Promise.allSettled(names.map(name => api.request(name + '/read.php').then(api.list)));
                el('summary').innerHTML = results.map((result, i) => {
                    const name = names[i];
                    const ok = result.status === 'fulfilled';
                    return '<div class="col-md-4 mb-4"><div class="card border-left-primary shadow-sm h-100"><div class="card-body"><div class="text-primary text-uppercase small font-weight-bold mb-2">' + definitions[name].title + '</div><div class="h2 font-weight-bold text-gray-800">' + (ok ? result.value.length : '—') + '</div><div class="small">' + (ok ? 'Jumlah catatan pada API' : escapeHTML(result.reason.message)) + '</div></div></div></div>';
                }).join('');
                if (results.some(r => r.status === 'rejected')) throw new Error('Sebagian data belum berhasil dimuat. Periksa pesan pada kartu lalu klik Muat ulang.');
            } else {
                const rows = api.list(await api.request(page + '/read.php'));
                table.clear().rows.add(rows).draw();
                el('loadStatus').textContent = rows.length + ' data berhasil dimuat dari API.';
            }
            return true;
        } catch (error) {
            if (el('loadStatus')) el('loadStatus').textContent = 'Pemuatan gagal. Tabel mungkin masih menampilkan data sebelumnya.';
            notice(error.message);
            return false;
        } finally { loading = false; el('refreshButton').disabled = false; }
    }
    function renderFields(row = {}) {
        el('formFields').innerHTML = definition.fields.map(([name, label, type, min]) => {
            const required = name !== 'keterangan';
            const common = 'class="form-control" id="field_' + name + '" name="' + name + '"' + (required ? ' required' : '');
            let input;
            if (type === 'select') input = '<select ' + common + '><option value="">Memuat pilihan…</option></select>';
            else if (type === 'textarea') input = '<textarea ' + common + ' rows="3"></textarea>';
            else input = '<input ' + common + ' type="' + type + '"' + (min !== undefined ? ' min="' + min + '" step="1"' : '') + (name === 'status_peminjaman' ? ' readonly' : '') + '>';
            return '<div class="form-group col-md-' + (type === 'textarea' ? '12' : '6') + '"><label for="field_' + name + '">' + label + (required ? ' *' : '') + '</label>' + input + '</div>';
        }).join('');
        for (const [name] of definition.fields) {
            if (row[name] != null) el('field_' + name).value = row[name];
        }
        if (page === 'asset' && editId === null) {
            el('field_kondisi').value = 'Baik';
            el('field_status').value = 'Tersedia';
        }
        if (page === 'peminjaman') {
            const today = new Date();
            const localDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
            el('field_tanggal_pinjam').value = localDate;
            el('field_tanggal_kembali').value = localDate;
            el('field_jumlah').value = '1';
            el('field_status_peminjaman').value = 'Pending';
        }
    }
    async function openForm(row = null) {
        const token = ++optionToken;
        editId = row ? getId(row) : null;
        el('dataForm').reset();
        notice('', 'danger', 'formNotice');
        el('formTitle').textContent = (row ? 'Edit ' : 'Tambah ') + definition.title;
        renderFields(row || {});
        el('saveButton').disabled = page === 'peminjaman';
        $('#formModal').modal('show');
        if (page !== 'peminjaman') return;
        try {
            const [students, assets] = await Promise.all([
                api.request('mahasiswa/read.php').then(api.list), api.request('asset/read.php').then(api.list)
            ]);
            if (token !== optionToken) return;
            function options(id, rows, label) {
                const select = el(id);
                select.innerHTML = '<option value="">Pilih data</option>';
                for (const item of rows) {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = label(item);
                    select.appendChild(option);
                }
            }
            options('field_id_mahasiswa', students, item => item.nim + ' — ' + item.nama);
            options('field_id_asset', assets, item => item.nama_asset + ' — ' + item.status + ' (jumlah: ' + item.jumlah + ')');
            if (!students.length || !assets.length) throw new Error('Tambahkan data mahasiswa dan asset terlebih dahulu.');
            el('saveButton').disabled = false;
        } catch (error) { if (token === optionToken) notice(error.message + ' Tutup formulir lalu coba lagi.', 'danger', 'formNotice'); }
    }
    function formPayload() {
        const payload = {};
        for (const [name, label, type] of definition.fields) {
            const input = el('field_' + name);
            const value = input.value.trim();
            if (input.required && !value) throw new Error(label + ' wajib diisi.');
            if (type === 'number' || type === 'select') {
                payload[name] = Number(value);
                if (!Number.isSafeInteger(payload[name]) || (type === 'select' && payload[name] <= 0)) throw new Error(label + ' harus berupa bilangan bulat yang valid.');
            } else payload[name] = value;
        }
        if (page === 'peminjaman' && payload.tanggal_kembali < payload.tanggal_pinjam) throw new Error('Tanggal kembali tidak boleh sebelum tanggal pinjam.');
        if (editId !== null) payload.id = Number(editId);
        return payload;
    }
    async function save(event) {
        event.preventDefault();
        if (busy || !el('dataForm').reportValidity()) return;
        let payload;
        try { payload = formPayload(); } catch (error) { notice(error.message, 'danger', 'formNotice'); return; }
        busy = true;
        el('saveButton').disabled = true;
        el('saveButton').textContent = 'Menyimpan…';
        notice('', 'danger', 'formNotice');
        try {
            const action = editId === null ? 'create' : 'update';
            await api.request(page + '/' + action + '.php', 'POST', payload);
            busy = false;
            $('#formModal').modal('hide');
            notice('Data berhasil disimpan.', 'success');
            const refreshed = await loadData();
            if (!refreshed) notice('Data telah disimpan, tetapi daftar belum berhasil diperbarui. Klik Muat ulang; jangan simpan ulang.', 'warning');
        } catch (error) { notice(error.message, 'danger', 'formNotice'); }
        finally { busy = false; el('saveButton').disabled = false; el('saveButton').textContent = 'Simpan'; }
    }
    async function showDetail(id) {
        el('detailTitle').textContent = 'Detail ' + definition.title;
        el('detailBody').textContent = 'Memuat detail…';
        $('#detailModal').modal('show');
        try {
            const row = api.detail(await api.request(detailURL(id)));
            const labels = Object.fromEntries([...definition.columns, ...definition.fields.map(([key, label]) => [key, label]), ['created_at', 'Dibuat pada'], ['id_mahasiswa', 'ID mahasiswa'], ['id_asset', 'ID asset']]);
            el('detailBody').innerHTML = '<dl class="row mb-0">' + Object.entries(row).map(([key, value]) => '<dt class="col-sm-4 detail-label">' + escapeHTML(labels[key] || key) + '</dt><dd class="col-sm-8">' + escapeHTML(value ?? '—') + '</dd>').join('') + '</dl>';
        } catch (error) { el('detailBody').textContent = error.message; }
    }
    async function rowAction(event) {
        const button = event.target.closest('button[data-action]');
        if (!button || busy || loading) return;
        const row = table.row(button.closest('tr')).data();
        if (!row) return;
        const id = getId(row);
        const action = button.dataset.action;
        if (action === 'detail') return showDetail(id);
        if (action === 'edit') {
            button.disabled = true;
            try { await openForm(api.detail(await api.request(detailURL(id)))); }
            catch (error) { notice(error.message); }
            finally { button.disabled = false; }
        }
        if (action === 'delete') {
            const name = row.nama_asset || row.nama || id;
            if (!window.confirm('Hapus ' + definition.title.toLowerCase() + ' "' + name + '" (ID ' + id + ')? Data akan dihapus dari API.')) return;
            busy = true;
            button.disabled = true;
            try {
                await api.request(page + '/delete.php?id=' + encodeURIComponent(id), 'DELETE');
                notice('Data berhasil dihapus.', 'success');
                if (!await loadData()) notice('Data sudah dihapus, tetapi daftar belum diperbarui. Klik Muat ulang.', 'warning');
            } catch (error) { notice(error.message); }
            finally { busy = false; button.disabled = false; }
        }
    }
    el('refreshButton').addEventListener('click', () => { if (!busy) { notice(''); loadData(); } });
    if (definition) {
        el('addButton').textContent = 'Tambah ' + definition.title;
        el('addButton').addEventListener('click', () => { if (!busy) openForm(); });
        el('dataForm').addEventListener('submit', save);
        $('#formModal').on('hide.bs.modal', event => { if (busy) event.preventDefault(); else optionToken++; });
        $('#formModal').on('shown.bs.modal', () => { const field = el('formFields').querySelector('input,select'); if (field) field.focus(); });
        el('dataTable').querySelector('thead').innerHTML = '<tr>' + [...definition.columns.map(([, title]) => title), 'Aksi'].map(title => '<th scope="col">' + title + '</th>').join('') + '</tr>';
        table = $('#dataTable').DataTable({
            data: [], pageLength: 10, order: [[0, 'desc']],
            columns: [...definition.columns.map(([key]) => ({ data: key, defaultContent: '—', render: (value, type) => type === 'display' ? escapeHTML(value ?? '—') : value })), {
                data: null, orderable: false, searchable: false,
                render: () => '<button type="button" class="btn btn-sm btn-outline-primary" data-action="detail">Detail</button>' + (page === 'peminjaman' ? '' : '<button type="button" class="btn btn-sm btn-outline-secondary" data-action="edit">Edit</button><button type="button" class="btn btn-sm btn-outline-danger" data-action="delete">Hapus</button>')
            }],
            language: { search: 'Cari:', lengthMenu: 'Tampilkan _MENU_ data', info: 'Data _START_–_END_ dari _TOTAL_', infoEmpty: 'Belum ada data', infoFiltered: '(dari _MAX_ data)', zeroRecords: 'Data tidak ditemukan', emptyTable: 'Belum ada data yang ditampilkan', paginate: { first: 'Awal', last: 'Akhir', next: 'Berikutnya', previous: 'Sebelumnya' } }
        });
        el('dataTable').addEventListener('click', rowAction);
    }
    loadData();
})();
