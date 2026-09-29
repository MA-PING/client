'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import styles from '@/styles/myPage/myPage.module.css';
import { AuthUser, changePassword } from '@/utils/authApi';
import { registerApiKey, deleteApiKey, updateNickname, updateMainCharacter, deleteAccount } from '@/utils/userApi';
import { getCharacterListClient } from '@/utils/characterListClient';
import { clearUserData, setUserInfo } from '@/redux/userSlice';
import { characterMainList } from '@/interfaces/character';

interface Props {
    initialUser: AuthUser;
    initialCharacterList: characterMainList[] | null;
}

type FieldMessage = { type: 'success' | 'error'; text: string } | null;

export default function MyPageContent({ initialUser, initialCharacterList }: Props) {
    const router = useRouter();
    const dispatch = useDispatch();

    const [user, setUser] = useState(initialUser);
    const [characterList, setCharacterList] = useState(initialCharacterList);

    const [nickname, setNickname] = useState(user.nickname);
    const [nicknameMsg, setNicknameMsg] = useState<FieldMessage>(null);
    const [nicknameLoading, setNicknameLoading] = useState(false);

    const [apiKey, setApiKey] = useState('');
    const [apiKeyMsg, setApiKeyMsg] = useState<FieldMessage>(null);
    const [apiKeyLoading, setApiKeyLoading] = useState(false);

    const [mainCharacter, setMainCharacter] = useState(user.mainCharacterName ?? '');
    const [mainCharacterMsg, setMainCharacterMsg] = useState<FieldMessage>(null);
    const [mainCharacterLoading, setMainCharacterLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordMsg, setPasswordMsg] = useState<FieldMessage>(null);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const [deletePassword, setDeletePassword] = useState('');
    const [deleteMsg, setDeleteMsg] = useState<FieldMessage>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const refreshCharacterList = async () => {
        const list = await getCharacterListClient();
        setCharacterList(list);
        return list;
    };

    const handleNicknameSubmit = async () => {
        if (!nickname.trim() || nickname === user.nickname) return;
        setNicknameLoading(true);
        setNicknameMsg(null);
        try {
            await updateNickname(nickname.trim());
            setUser({ ...user, nickname: nickname.trim() });
            dispatch(setUserInfo({ userId: user.id, userName: nickname.trim(), email: user.email }));
            setNicknameMsg({ type: 'success', text: '닉네임을 변경했어요.' });
        } catch (e) {
            setNicknameMsg({ type: 'error', text: e instanceof Error ? e.message : '닉네임 변경에 실패했습니다.' });
        } finally {
            setNicknameLoading(false);
        }
    };

    const handleApiKeyRegister = async () => {
        if (!apiKey.trim()) return;
        setApiKeyLoading(true);
        setApiKeyMsg(null);
        try {
            await registerApiKey(apiKey.trim());
            setApiKey('');
            setApiKeyMsg({ type: 'success', text: 'API 키를 등록했어요.' });
            await refreshCharacterList();
        } catch (e) {
            setApiKeyMsg({ type: 'error', text: e instanceof Error ? e.message : 'API 키 등록에 실패했습니다.' });
        } finally {
            setApiKeyLoading(false);
        }
    };

    const handleApiKeyDelete = async () => {
        if (!confirm('등록된 넥슨 API 키를 삭제할까요?')) return;
        setApiKeyLoading(true);
        setApiKeyMsg(null);
        try {
            await deleteApiKey();
            setApiKeyMsg({ type: 'success', text: 'API 키를 삭제했어요.' });
            setCharacterList(null);
        } catch (e) {
            setApiKeyMsg({ type: 'error', text: e instanceof Error ? e.message : 'API 키 삭제에 실패했습니다.' });
        } finally {
            setApiKeyLoading(false);
        }
    };

    const handleMainCharacterSubmit = async () => {
        if (!mainCharacter) return;
        setMainCharacterLoading(true);
        setMainCharacterMsg(null);
        try {
            await updateMainCharacter(mainCharacter);
            setUser({ ...user, mainCharacterName: mainCharacter });
            setMainCharacterMsg({ type: 'success', text: '본캐를 설정했어요.' });
        } catch (e) {
            setMainCharacterMsg({ type: 'error', text: e instanceof Error ? e.message : '본캐 설정에 실패했습니다.' });
        } finally {
            setMainCharacterLoading(false);
        }
    };

    const handlePasswordSubmit = async () => {
        if (!currentPassword || !newPassword) return;
        setPasswordLoading(true);
        setPasswordMsg(null);
        try {
            await changePassword(currentPassword, newPassword);
            setCurrentPassword('');
            setNewPassword('');
            setPasswordMsg({ type: 'success', text: '비밀번호를 변경했어요.' });
        } catch (e) {
            setPasswordMsg({ type: 'error', text: e instanceof Error ? e.message : '비밀번호 변경에 실패했습니다.' });
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm('정말 탈퇴하시겠어요? 이 작업은 되돌릴 수 없습니다.')) return;
        setDeleteLoading(true);
        setDeleteMsg(null);
        try {
            await deleteAccount(deletePassword || undefined);
            dispatch(clearUserData());
            router.push('/');
        } catch (e) {
            setDeleteMsg({ type: 'error', text: e instanceof Error ? e.message : '회원 탈퇴에 실패했습니다.' });
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>내 계정 설정</h1>

            <section className={styles.card}>
                <h2 className={styles.cardTitle}>프로필</h2>
                <div className={styles.row}>
                    <span className={styles.label}>이메일</span>
                    <span className={styles.value}>{user.email}</span>
                </div>
                <div className={styles.inputRow}>
                    <input
                        className={styles.input}
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임"
                        maxLength={50}
                    />
                    <button
                        className={styles.button}
                        onClick={handleNicknameSubmit}
                        disabled={nicknameLoading || !nickname.trim() || nickname === user.nickname}
                    >
                        변경
                    </button>
                </div>
                {nicknameMsg && (
                    <p className={`${styles.message} ${nicknameMsg.type === 'success' ? styles.messageSuccess : styles.messageError}`}>
                        {nicknameMsg.text}
                    </p>
                )}
            </section>

            <section className={styles.card}>
                <h2 className={styles.cardTitle}>넥슨 API 키</h2>
                <p className={styles.helperText}>등록하면 로그인할 때마다 내 캐릭터 정보를 자동으로 불러와요.</p>
                <div className={styles.inputRow}>
                    <input
                        className={styles.input}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="test_ 또는 live_로 시작하는 API 키"
                    />
                    <button className={styles.button} onClick={handleApiKeyRegister} disabled={apiKeyLoading || !apiKey.trim()}>
                        등록
                    </button>
                    <button className={styles.buttonOutline} onClick={handleApiKeyDelete} disabled={apiKeyLoading}>
                        삭제
                    </button>
                </div>
                {apiKeyMsg && (
                    <p className={`${styles.message} ${apiKeyMsg.type === 'success' ? styles.messageSuccess : styles.messageError}`}>
                        {apiKeyMsg.text}
                    </p>
                )}

                {characterList && characterList.length > 0 && (
                    <>
                        <div className={styles.inputRow}>
                            <select
                                className={styles.select}
                                value={mainCharacter}
                                onChange={(e) => setMainCharacter(e.target.value)}
                            >
                                <option value="" disabled>본캐로 설정할 캐릭터 선택</option>
                                {characterList.map((c) => (
                                    <option key={c.character_name} value={c.character_name}>
                                        {c.character_name} (Lv.{c.character_level})
                                    </option>
                                ))}
                            </select>
                            <button
                                className={styles.button}
                                onClick={handleMainCharacterSubmit}
                                disabled={mainCharacterLoading || !mainCharacter}
                            >
                                본캐 설정
                            </button>
                        </div>
                        {mainCharacterMsg && (
                            <p className={`${styles.message} ${mainCharacterMsg.type === 'success' ? styles.messageSuccess : styles.messageError}`}>
                                {mainCharacterMsg.text}
                            </p>
                        )}
                    </>
                )}
            </section>

            <section className={styles.card}>
                <h2 className={styles.cardTitle}>비밀번호 변경</h2>
                <input
                    className={styles.input}
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="현재 비밀번호"
                />
                <input
                    className={styles.input}
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="새 비밀번호 (8자 이상)"
                />
                <button
                    className={styles.button}
                    onClick={handlePasswordSubmit}
                    disabled={passwordLoading || !currentPassword || newPassword.length < 8}
                >
                    비밀번호 변경
                </button>
                {passwordMsg && (
                    <p className={`${styles.message} ${passwordMsg.type === 'success' ? styles.messageSuccess : styles.messageError}`}>
                        {passwordMsg.text}
                    </p>
                )}
            </section>

            <section className={`${styles.card} ${styles.dangerZone}`}>
                <h2 className={`${styles.cardTitle} ${styles.dangerTitle}`}>회원 탈퇴</h2>
                <p className={styles.helperText}>소셜 로그인으로 가입했다면 비밀번호 입력 없이 탈퇴할 수 있어요.</p>
                <div className={styles.inputRow}>
                    <input
                        className={styles.input}
                        type="password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        placeholder="비밀번호 (로컬 계정만 필요)"
                    />
                    <button className={styles.buttonOutline} onClick={handleDeleteAccount} disabled={deleteLoading}>
                        탈퇴하기
                    </button>
                </div>
                {deleteMsg && <p className={`${styles.message} ${styles.messageError}`}>{deleteMsg.text}</p>}
            </section>
        </div>
    );
}
