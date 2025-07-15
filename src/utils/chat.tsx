interface aiBody {
    chatId: string | null;
    ocid: string | null;
    characterName: string | null;
    type: string | null;
    text: string;
}

interface aiGuestStream {
    topic: string;
    uuid: string; // AI 응답에 uuid가 있다면 사용, 없으면 불필요
    content: string;
}


export async function getMessage(
    token: string,
    body: aiBody,
    onStreamData: (data: aiGuestStream) => void,
    onStreamEnd: () => void, // 스트림 종료 시 호출될 콜백 추가
    onStreamError: (errorContent: string) => void // 스트림 오류 시 호출될 콜백 추가
): Promise<void> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/ai/chat/stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
            cache: 'no-cache',
        });

        if (!response.ok) {
            console.error('서버 응답 오류:', response.status, response.statusText);
            onStreamError(`서버 응답 오류: ${response.status} ${response.statusText}`);
            onStreamEnd(); // 오류 발생 시에도 스트림 종료 처리
            return;
        }

        const reader = response.body?.getReader();
        if (!reader) {
            console.error('응답 본문에서 reader를 가져올 수 없습니다.');
            onStreamError('데이터 스트림을 처리할 수 없습니다.');
            onStreamEnd(); // 오류 발생 시에도 스트림 종료 처리
            return;
        }

        const decoder = new TextDecoder();
        let receivedText = '';

        while (true) {
            const {done, value} = await reader.read();

            if (done) {
                console.log('스트림이 종료되었습니다.');
                onStreamEnd(); // 스트림 종료 콜백 호출
                break;
            }

            if (value) {
                receivedText += decoder.decode(value, {stream: true});
            }

            const lines = receivedText.split('\n');
            receivedText = lines.pop() || '';

            for (const line of lines) {
                if (line.startsWith('data:')) {
                    const jsonString = line.substring(5).trim();
                    try {
                        const parsedData: aiGuestStream = JSON.parse(jsonString);
                        onStreamData(parsedData);
                    } catch (parseError) {
                        console.error('JSON 파싱 오류:', parseError, '원시 데이터:', jsonString);
                        // 파싱 오류는 치명적이지 않을 수 있으므로, 전체 스트림을 중단하기보다는 오류 메시지를 전달
                        onStreamError('데이터 파싱 중 오류가 발생했습니다.');
                    }
                }
            }
        }
    } catch (error) {
        console.error('스트림 요청 또는 처리 오류:', error);
        onStreamError('네트워크 연결 또는 요청 처리 중 오류가 발생했습니다.');
        onStreamEnd(); // 오류 발생 시에도 스트림 종료 처리
    }
}