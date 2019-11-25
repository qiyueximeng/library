const _runTime = performance.timing.navigationStart;
function Capture(setting) {
  setting.framerate || 60;
  setting.verbose || false;
  setting.startTime || 0;

  const _setTimeout = setTimeout,
    _clearTimeout = clearTimeout,
    _setInterval = setInterval,
    _clearInterval = clearInterval,
    _requestAnimationFrame = requestAnimationFrame,
    _performanceNow = performance.now,
    _now = Date.now,
    _getTime = Date.prototype.getTime;
  let _capturing = false,
    _startTime,
    _performanceTime,
    _performanceStartTime,
    _time,
    _frameCount = 0,
    _rafCbs = [],
    _timeouts = [],
    _intervals = [],
    imgs = [];

  function start() {
    _log('capture start!');
    _startTime = _now();
    _time = _startTime + setting.startTime;
    _performanceStartTime = performance.now();
    _performanceTime = _performanceStartTime + setting.startTime;

    Date.prototype.getTime = () => _time;
    Date.now = () => _time;
    performance.now = () => _performanceTime;
    setTimeout = (cb, time) => {
      const t = { cb, time, triggerTime: _time + time };
      _timeouts.push(t);
      _log(`Timeout set to ${time}`);
      return t;
    };
    clearTimeout = t => {
      for (var i = 0; i < _timeouts.length; i++) {
        if (_timeouts[i] === t) {
          _timeouts.splice(i, 1);
          _log('Timeout cleared');
          break;
        }
      }
    };
    setInterval = (cb, time) => {
      const t = { cb, time, triggerTime: _time + time };
      _intervals.push(t);
      _log(`Interval set to ${time}`);
      return t;
    };
    clearInterval = () => (_log('clear Interval'), null);
    requestAnimationFrame = cb => { _rafCbs.push(cb); }
    _capturing = true;
  }

  function add(canvas) {
    if (!_capturing || !canvas) return;
    const base64 = canvas.toDataURL('image/jpeg', 0.77);
    imgs.push(base64);
    _call(_process);
    _frameCount++;
    _log(`Full Frame! ${_frameCount}`);
    return base64;
  }

  function end(cb) {
    _log('capture end!');
    _capturing = false;
    window.setTimeout = _setTimeout;
    window.clearTimeout = _clearTimeout;
    window.setInterval = _setInterval;
    window.clearInterval = _clearInterval;
    window.requestAnimationFrame = _requestAnimationFrame;
    window.Date.prototype.getTime = _getTime;
    window.Date.now = _now;
    window.performance.now = _performanceNow;
    typeof cb === 'function' && cb(imgs);
  }

  function _process() {
    const dt = _frameCount * (1000 / setting.framerate);
    _time = _startTime + dt;
    _performanceTime = _performanceStartTime + dt;
    for (let i in _timeouts) if (_time >= _timeouts[i].triggerTime) (_call(_timeouts[i].cb), _timeouts.splice(i, 1));
    for (let t of _intervals) if (_time >= t.triggerTime) (_call(t.cb), t.triggerTime += t.time);
    for (let cb of _rafCbs) _call(cb, _time - _runTime);
    _rafCbs = [];
  }
  function _log(msg) { if(setting.verbose) console.log(msg); }
  function _call(fn, p) { _setTimeout(fn, 0, p); }

  return { start, add, end }
}
