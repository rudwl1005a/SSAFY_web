export default {
    template:
    `
    <div class="mt-3">
        <div class="mb-3">
            <label for="userId" class="form-label">User ID</label>
            <input type="text" class="form-control" id="userId" placeholder="아이디를 입력하세요.">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="비밀번호를 입력하세요.">
        </div>
        <button type="button" class="btn btn-primary">로그인</button>
    </div>
    `
}