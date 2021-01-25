//获取内网ip
var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
if (RTCPeerConnection) (
    function () {
        var rtc = new RTCPeerConnection({iceServers: []});
        if (1 || window.mozRTCPeerConnection) {
            rtc.createDataChannel('', {reliable: false});
        }
        ;

        rtc.onicecandidate = function (evt) {
            if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);
        };
        rtc.createOffer(function (offerDesc) {
            grepSDP(offerDesc.sdp);
            rtc.setLocalDescription(offerDesc);
        }, function (e) {
            console.warn("offer failed", e);
        });
        var addrs = Object.create(null);
        addrs["0.0.0.0"] = false;

        function updateDisplay(newAddr) {
            if (newAddr in addrs) return;
            else addrs[newAddr] = true;
            var displayAddrs = Object.keys(addrs).filter(function (k) {
                return addrs[k];
            });
            for (var i = 0; i < displayAddrs.length; i++) {
                if (displayAddrs[i].length > 16) {
                    displayAddrs.splice(i, 1);
                    i--;
                }
            }
//打印出该设备连接的所有内网ip
            console.log(displayAddrs);
//排第一个ip
            console.log(displayAddrs[0]);
        }

        function grepSDP(sdp) {
            var hosts = [];
            sdp.split('\r\n').forEach(function (line, index, arr) {
                if (~line.indexOf("a=candidate")) {
                    var parts = line.split(' '),
                        addr = parts[4],
                        type = parts[7];
                    if (type === 'host') updateDisplay(addr);
                } else if (~line.indexOf("c=")) {
                    var parts = line.split(' '),
                        addr = parts[2];
                    updateDisplay(addr);
                }
            });
        }
    })();
else {
    console.log("请使用主流浏览器：chrome,firefox,opera,safari");
}
