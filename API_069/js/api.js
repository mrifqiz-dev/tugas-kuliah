/* Semua komunikasi dengan API ada di file ini. */
(function (global) {
    'use strict';
    async function request(path, method = 'GET', body) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), global.APP_CONFIG.timeoutMs);
        try {
            const options = { method, signal: controller.signal, headers: { Accept: 'application/json' } };
            if (body !== undefined) {
                options.headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(body);
            }
            const response = await fetch(global.APP_CONFIG.baseUrl.replace(/\/$/, '') + '/' + path, options);
            const raw = await response.text();
            let result;
            try { result = JSON.parse(raw); }
            catch (_) { throw new Error('API mengirim respons bukan JSON (HTTP ' + response.status + '). Periksa responsnya di Postman.'); }
            const failed = result && !Array.isArray(result) && (
                result.success === false || result.success === 0 || result.status === false ||
                ['error', 'failed', 'fail', 'gagal'].includes(String(result.status).toLowerCase()) ||
                Boolean(result.error) || /\b(gagal|failed|not found|tidak ditemukan|invalid|cannot|unable)\b/i.test(result.message || '')
            );
            if (!response.ok || failed) {
                throw new Error((result && (result.message || result.error)) || 'Permintaan gagal (HTTP ' + response.status + ').');
            }
            return result;
        } catch (error) {
            if (error.name === 'AbortError') throw new Error('Waktu tunggu API habis. Untuk simpan/hapus, muat ulang daftar sebelum mencoba lagi agar data tidak ganda.');
            if (error instanceof TypeError) throw new Error('Tidak dapat terhubung ke API. Periksa internet dan coba endpoint yang sama di Postman. Jika hanya browser gagal, periksa CORS pada server API.');
            throw error;
        } finally { clearTimeout(timer); }
    }
    function list(result) {
        if (Array.isArray(result)) return result;
        if (result && Array.isArray(result.data)) return result.data;
        throw new Error('Format daftar dari API belum dikenali. Periksa respons GET di Postman.');
    }
    function detail(result) {
        const value = result && result.data !== undefined ? result.data : result;
        const row = Array.isArray(value) ? value[0] : value;
        if (!row || typeof row !== 'object' || (row.id == null && row.id_peminjaman == null)) {
            throw new Error('Data detail tidak ditemukan atau formatnya tidak sesuai. Muat ulang daftar.');
        }
        return row;
    }
    global.LabAPI = { request, list, detail };
})(window);
